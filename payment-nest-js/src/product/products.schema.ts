import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as sh } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;


@Schema()
export class Product {

  @Prop({ required: true })
  id: number;

  @Prop()
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  description: string;

  @Prop()
  image: string;
  
}

export const ProductSchema = SchemaFactory.createForClass(Product);