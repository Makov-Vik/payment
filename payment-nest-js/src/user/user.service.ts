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

  async createUser(dto: CreateUserDto) {    
    return await this.userModel.create(dto);
  }

  async getUserByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  // async addUserProduct(email: string, id: string) {
  //   return await 
  // }

}
