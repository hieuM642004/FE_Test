import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Topic } from './schemas/topic.schema';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Product } from '../products/schemas/product.schema';
import FirebaseService from 'src/providers/storage/firebase/firebase.service';
import { log } from 'console';

@Injectable()
export class TopicService {
  private firebaseService: FirebaseService;
  constructor(
    @InjectModel(Topic.name) private topicModel: Model<Topic>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {
    this.firebaseService = new FirebaseService();
  }

  async findAll(): Promise<Topic[]> {
    return this.topicModel.find().populate('products').exec();
  }

  async findById(identifier: string): Promise<Topic> {
    let topic: Topic;
    
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      topic = await this.topicModel.findById(identifier).populate('products').exec();
    } else {
      topic = await this.topicModel.findOne({ slug: identifier }).populate('products').exec();
    }
    
    if (!topic) {
      throw new NotFoundException('Topic not found.');
    }
    return topic;
  }

  async create(createTopicDto: CreateTopicDto, file?: Express.Multer.File): Promise<Topic> {
    const newTopic = new this.topicModel(createTopicDto);
    if (file) {
      newTopic.image = await this.firebaseService.uploadImageToFirebase(
        file.buffer,
        file.originalname,
        'topics',
      );
    }

    return newTopic.save();
  }

  async updateById(id: string, updateTopicDto: UpdateTopicDto): Promise<Topic> {
    const updatedTopic = await this.topicModel.findByIdAndUpdate(
      id,
      updateTopicDto,
      { new: true },
    );
    if (!updatedTopic) {
      throw new NotFoundException('Topic not found.');
    }
    return updatedTopic;
  }

  async deleteById(id: string): Promise<Topic> {
    const deletedTopic = await this.topicModel.findByIdAndDelete(id);
    if (!deletedTopic) {
      throw new NotFoundException('Topic not found.');
    }

    await this.productModel.updateMany({ idTopic: id }, { $unset: { idTopic: '' } });

    return deletedTopic;
  }
}
