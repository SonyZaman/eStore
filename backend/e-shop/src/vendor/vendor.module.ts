import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorEntity } from './vendor.entity';
import { ProductEntity } from '../product/product.entity';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VendorEntity, ProductEntity])],
  providers: [VendorService],
  controllers: [VendorController],
})
export class VendorModule {}
