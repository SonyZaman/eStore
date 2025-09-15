import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemEntity } from './order-item.entity';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItemEntity])],
  controllers: [OrderItemController],
  providers: [OrderItemService],
  exports: [OrderItemService],
})
export class OrderItemModule {}
