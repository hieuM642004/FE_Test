import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TopicService } from './topic.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { Topic } from './schemas/topic.schema';
import { AdminGuard } from 'src/auth/guards/authorization.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('topics')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Get()
  async getAllTopics(): Promise<ResponseData<Topic[]>> {
    try {
      const topics = await this.topicService.findAll();
      return new ResponseData<Topic[]>(topics, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<Topic[]>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  @Get(':identifier')
  async getTopic(@Param('identifier') identifier: string): Promise<ResponseData<Topic>> {
    try {
      const topic = await this.topicService.findById(identifier);
      return new ResponseData<Topic>(topic, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<Topic>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  // @UseGuards(AdminGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createTopic(
    @Body() createTopicDto: CreateTopicDto,
    @UploadedFile() file?: Express.Multer.File
  ): Promise<ResponseData<Topic>> {
    try {
      const newTopic = new Topic();
          Object.assign(newTopic, createTopicDto);
    
          newTopic.generateSlug();
      const saveTopic = await this.topicService.create(newTopic, file);
      return new ResponseData<Topic>(saveTopic, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<Topic>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  // @UseGuards(AdminGuard)
  @Put(':id')
  async updateTopic(
    @Param('id') id: string,
    @Body() updateTopicDto: UpdateTopicDto
  ): Promise<ResponseData<Topic>> {
    try {
      const updatedTopic = await this.topicService.updateById(id, updateTopicDto);
      return new ResponseData<Topic>(updatedTopic, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<Topic>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  // @UseGuards(AdminGuard)
  @Delete(':id')
  async deleteTopic(@Param('id') id: string): Promise<ResponseData<Topic>> {
    try {
      const deletedTopic = await this.topicService.deleteById(id);
      return new ResponseData<Topic>(deletedTopic, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<Topic>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }
}
