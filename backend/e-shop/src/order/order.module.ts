import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { CustomerEntity } from '../customer/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, CustomerEntity])],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
