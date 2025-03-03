import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import slugify from 'slugify';
import { SchemaTypes, Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Product { 
  @Prop()
  name: string;

  @Prop()
  images: string[];

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop({ default: 0 })
  views: number;

  @Prop()
  slug: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Topic' }) 
  idTopic: Types.ObjectId;

  _id: any;

  async generateSlug() {
    this.slug = slugify(this.name, { lower: true, remove: /[*+~.()'"!:@]/g });
  }
}

export const ProductSchema = SchemaFactory.createForClass(Product);