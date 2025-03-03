import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Readable } from 'stream';
import { User } from './schemas/user.schema';
import FirebaseService from 'src/providers/storage/firebase/firebase.service';
@Injectable()
export class UserService {
  private firebaseService: FirebaseService;
  constructor(
    @InjectModel(User.name)
    private readonly userModel: mongoose.Model<User>,
  ) { this.firebaseService = new FirebaseService();}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().populate("followers");
    return users;
  }

  // async create(user: User, file: Express.Multer.File): Promise<User> {
  //   try {
  //     const hashedPassword = await bcrypt.hash(user.password, 10);
  //     const userWithHashedPassword = { ...user, password: hashedPassword };
  //     const fileStream = Readable.from(file.buffer);
  //     const fileId = await this.googleDriveUploader.uploadImage(
  //       fileStream,
  //       file.originalname,
  //       '1eHh70ah2l2JuqHQlA1riebJZiRS9L20q',
  //     );

  //     const avatarUrl = this.googleDriveUploader.getThumbnailUrl(fileId);
  //     const userWithAvatar = { ...userWithHashedPassword, avatar: avatarUrl };
  //     const res = await this.userModel.create(userWithAvatar);
  //     return res;
  //   } catch (error) {
  //     console.error('Error creating user:', error);
  //     throw error;
  //   }
  // }

  async findById(identifier: string): Promise<User> {
    let user: User;

    if (mongoose.Types.ObjectId.isValid(identifier)) {
      user = await this.userModel.findById(identifier).populate('articles').populate({
        path: 'followers.userId',
        model: 'User', 
      })
    } else {
      user = await this.userModel.findOne({ slug: identifier }).populate('articles').populate({
        path: 'followers.userId',
        model: 'User', 
      })
    }

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  async updateById(
    id: string,
    userDto: User,
    file: Express.Multer.File,
  ): Promise<User> {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        throw new NotFoundException('User not found.');
      }

      if (file) {
        const avatarUrl = await this.firebaseService.uploadImageToFirebase(
          file.buffer,
          file.originalname,
          'avatars',
        );
        user.avatar = avatarUrl;
      }

      user.username = userDto.username;
      user.email = userDto.email;
      // user.password = userDto.password;
      user.role = userDto.role;
      user.slug = userDto.slug;
      // user.followers = userDto.followers;

      return await user.save();
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }


  async deleteById(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }

  
}
