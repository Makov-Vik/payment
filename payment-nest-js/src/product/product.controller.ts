import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  createProduct(@Body() productDto: ProductDto): Promise<Product> {
    return this.productService.createProduct(productDto);
  }

  @Get()
  getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }
}
