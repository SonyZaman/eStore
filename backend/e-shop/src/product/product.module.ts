import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { VendorEntity } from '../vendor/vendor.entity';
import { CategoryEntity } from '../category/category.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PusherService } from 'src/notifications/pusher.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, VendorEntity, CategoryEntity])],
  providers: [ProductService,PusherService],
  controllers: [ProductController],
})
export class ProductModule {}
