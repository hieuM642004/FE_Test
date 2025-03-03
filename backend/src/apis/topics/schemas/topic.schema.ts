import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import slugify from 'slugify';
import { Product } from 'src/apis/products/schemas/product.schema';

@Schema({
  timestamps: true,
})
export class Topic {
  @Prop({ required: true })
  name: string;

  @Prop()
  image: string;

  @Prop()
  description: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Product' }] })
  products: Product[];
  @Prop()
  slug: string;
  async generateSlug() {
    this.slug = slugify(this.name, { lower: true, remove: /[*+~.()'"!:@]/g });
  }
}

export const TopicSchema = SchemaFactory.createForClass(Topic);
