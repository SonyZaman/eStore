import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { VendorEntity } from '../vendor/vendor.entity';
import { CategoryEntity } from '../category/category.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, VendorEntity, CategoryEntity])],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
