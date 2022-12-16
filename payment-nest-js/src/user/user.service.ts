import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<UserSchema> {    
    return await this.userModel.create(dto);
  }

  async getUserByEmail(email: string): Promise<UserSchema> {
    return await this.userModel.findOne({ email });
  }

  async addUserProduct(emailUser: string, idProducts: string[]): Promise<unknown> {
    return await this.userModel.updateOne(
      { email: emailUser },
      { $push: { subscriptions: { $each: idProducts } } }
   )
  }

}
