import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private productModel: Model<Product>,
  ) {}

  async createProduct(productDto: ProductDto) {
    return await this.productModel.create(productDto);
  };

  async getAllProducts() {
    return await this.productModel.find({});
  }
}
