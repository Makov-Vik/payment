import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  createProduct(@Body() productDto: ProductDto) {
    return this.productService.createProduct(productDto);
  }

  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }
}
