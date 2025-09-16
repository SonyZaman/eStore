import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Create a new product
  @Post()
  async create(@Body() dto: CreateProductDto): Promise<ProductEntity> {
    return this.productService.createProduct(dto);
  }

  // Get all products
  @Get()
  async findAll(): Promise<ProductEntity[]> {
    return this.productService.findAll();
  }

    // Get products for a specific vendor
 
  @Get('vendor/:vendorId')
  async findByVendor(@Param('vendorId') vendorId: number) {
    return this.productService.findByVendor(vendorId);  // Fetch products by vendorId
  }

  

  // // Get single product by ID
  // @Get(':id')
  // async findOne(@Param('id') id: number): Promise<ProductEntity> {
  //   return this.productService.findOne(id);
  // }
}
