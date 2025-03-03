import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductSchema } from './schemas/product.schema';
import { AuthModule } from 'src/auth/auth.module';
import { TopicModule } from '../topics/topic.module';
import { TopicSchema } from '../topics/schemas/topic.schema';
import { UserModule } from '../users/user.module';
import { UserSchema } from '../users/schemas/user.schema';

@Module({
  imports: [
    TopicModule,
    UserModule,
    AuthModule,
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema }, 
      { name: 'Topic', schema: TopicSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [ProductController], 
  providers: [ProductService], 
})
export class ProductsModule {} 