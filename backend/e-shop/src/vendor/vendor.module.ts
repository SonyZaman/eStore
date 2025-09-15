import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorEntity } from './vendor.entity';
import { ProductEntity } from '../product/product.entity';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { AuthService } from '../auth/auth.service';  // Import AuthService
import { JwtService } from '@nestjs/jwt'; // example for JwtService

@Module({
  imports: [TypeOrmModule.forFeature([VendorEntity, ProductEntity])],
  providers: [VendorService, AuthService,JwtService],
  controllers: [VendorController],
  exports: [VendorService], 
})
export class VendorModule {}
