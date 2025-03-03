import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Product } from './schemas/product.schema';
import { User } from '../users/schemas/user.schema';
import { PaginatedResult } from './interface/pagination.interface';
import FirebaseService from 'src/providers/storage/firebase/firebase.service';
import { Topic } from '../topics/schemas/topic.schema';

@Injectable()
export class ProductService {
  private firebaseService: FirebaseService;

  constructor(
    @InjectModel(Product.name)
    private productModel: mongoose.Model<Product>,
    @InjectModel(Topic.name)
    private topicModel: mongoose.Model<Topic>,
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {
    this.firebaseService = new FirebaseService();
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    searchQuery?: string,
    topicId?: string,
  ): Promise<PaginatedResult<Product>> {
    let query: any = {};

    if (searchQuery) {
      query = { ...query, name: { $regex: searchQuery, $options: 'i' } }; 
    }

    if (topicId) {
      query = { ...query, idTopic: topicId };
    }

    const totalItems = await this.productModel.countDocuments(query).exec();
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;

    const products = await this.productModel
      .find(query)
      .populate('idTopic')
      .skip(startIndex)
      .limit(limit)
      .exec();

    const result: PaginatedResult<Product> = {
      data: products,
      totalPages: totalPages,
      currentPage: page,
      totalItems: totalItems,
    };
    return result;
  }

  async findTopProducts(): Promise<Product[]> {
    return this.productModel.find().sort({ views: -1 }).limit(10).exec();
  }

  async create(
    productDto: Product,
    files: Express.Multer.File[],
  ): Promise<Product> {
    try {
      const imagesUrlPromises = files.map(async (file) => {
        const imageUrl = await this.firebaseService.uploadImageToFirebase(
          file.buffer,
          file.originalname,
          'products', 
        );
        return imageUrl;
      });
      const imagesUrl = await Promise.all(imagesUrlPromises);

      const newProduct = new this.productModel({
        ...productDto,
        images: imagesUrl,
      });

      await this.topicModel.findByIdAndUpdate(
        productDto.idTopic,
        { $push: { products: newProduct._id } }, 
        { new: true },
      );

      return newProduct.save();
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  async findById(identifier: string): Promise<{ product: Product; relatedProducts: Product[] }> {
    let product: Product;
  
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      product = await this.productModel.findById(identifier).populate('idTopic');
    } else {
      product = await this.productModel.findOne({ slug: identifier }).populate('idTopic');
    }
  
    if (!product) {
      throw new NotFoundException('Product not found.');
    }
  
    product.views += 1;
    await this.productModel.findByIdAndUpdate(product._id, {
      views: product.views,
    });

    const relatedProducts = await this.productModel
      .find({
        idTopic: product.idTopic?._id, 
        _id: { $ne: product._id }, 
      })
      .limit(5) 
      .exec();
  
    return { product, relatedProducts };
  }
  
  async updateById(
    id: string,
    productDto: Product,
    files: Express.Multer.File[],
  ): Promise<Product> {
    try {
      const product = await this.productModel.findById(id);
      if (!product) {
        throw new NotFoundException('Product not found.');
      }

      for (const imageUrl of product.images) {
        await this.firebaseService.deleteImageFromFirebase(imageUrl);
      }

      const imagesUrlPromises = files.map(async (file) => {
        const imageUrl = await this.firebaseService.uploadImageToFirebase(
          file.buffer,
          file.originalname,
          'products', 
        );
        return imageUrl;
      });
      const imagesUrl = await Promise.all(imagesUrlPromises);

      product.name = productDto.name; 
      product.description = productDto.description; 
      product.images = imagesUrl;
      product.price = productDto.price;
      product.slug = productDto.slug;

      return await product.save();
    } catch (error) {
      console.error('Error updating product:', error);
      throw new Error('Could not update product. Please try again.');
    }
  }

  async deleteById(id: string): Promise<Product> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id);
    await this.userModel.updateOne(
      { products: id }, 
      { $pull: { products: id } },
    );
    await this.topicModel.updateOne(
      { products: id }, 
      { $pull: { products: id } },
    );
    return deletedProduct;
  }
}