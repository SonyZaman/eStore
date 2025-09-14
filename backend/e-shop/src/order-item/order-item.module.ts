import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemEntity } from './order-item.entity';
import { ProductEntity } from '../product/product.entity';
import { OrderEntity } from '../order/order.entity';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItemEntity, ProductEntity, OrderEntity])],
  providers: [OrderItemService],
  controllers: [OrderItemController],
})
export class OrderItemModule {}
