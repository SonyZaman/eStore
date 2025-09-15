import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderEntity } from './order.entity';
import { OrderItemModule } from '../order-item/order-item.module';
import { CustomerEntity } from '../customer/customer.entity'; // add this
import { ProductEntity } from '../product/product.entity'; // add this

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, CustomerEntity, ProductEntity]),
    OrderItemModule, // needed for OrderItemService
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
