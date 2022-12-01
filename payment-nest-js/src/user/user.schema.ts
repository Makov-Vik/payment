import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as sh } from 'mongoose';

export type UserDocument = HydratedDocument<User>;


@Schema()
export class User {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  subscriptions: string[];
  
  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);