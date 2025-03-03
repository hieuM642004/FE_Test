import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  Query
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schemas/product.schema';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/guards/authorization.guard';
import { PaginatedResult } from './interface/pagination.interface';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') searchQuery?: string
  ): Promise<ResponseData<PaginatedResult<Product>>> {
    try {
      const paginatedResult = await this.productService.findAll(page, limit, searchQuery);
      return new ResponseData<PaginatedResult<Product>>(paginatedResult, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<PaginatedResult<Product>>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  @UseGuards(AdminGuard)
  @Get('/top')
  async getTopProducts(): Promise<ResponseData<Product[]>> {
    try {
      const topProducts = await this.productService.findTopProducts();
      return new ResponseData<Product[]>(topProducts, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<Product[]>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  @Post()
  @UseInterceptors(FilesInterceptor('images', 10))
  async createProduct(
    @Body() productDto: CreateProductDto,
    @UploadedFiles() files: Express.Multer.File[]
  ): Promise<ResponseData<Product>> {
    try {
      const newProduct = new Product();
      Object.assign(newProduct, productDto);

      newProduct.generateSlug();

      const savedProduct = await this.productService.create(newProduct, files);
      
      return new ResponseData<Product>(savedProduct, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<Product>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  @Get(':identifier')
async getProduct(@Param('identifier') identifier: string): Promise<ResponseData<{ product: Product; relatedProducts: Product[] }>> {
  try {
    const result = await this.productService.findById(identifier);
    return new ResponseData(result, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
  } catch (error) {
    console.error('Error fetching product:', error);
    return new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR);
  }
}


  @Put(':id')
  @UseInterceptors(FilesInterceptor('images', 10))
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() files: Express.Multer.File[]
  ): Promise<ResponseData<Product>> {
    try {
      const updatedProduct = new Product();
      Object.assign(updatedProduct, updateProductDto);

      updatedProduct.generateSlug();

      const savedProduct = await this.productService.updateById(id, updatedProduct, files);
      
      return new ResponseData<Product>(savedProduct, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<Product>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  @Delete(':id')
  async deleteProduct(
    @Param('id') id: string
  ): Promise<ResponseData<Product>> {
    try {
      const deletedProduct = await this.productService.deleteById(id);
      return new ResponseData<Product>(deletedProduct, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<Product>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }
}