import { Controller, Get, Post, Body } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemEntity } from './order-item.entity';

@Controller('order-items')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  async create(@Body() dto: Partial<OrderItemEntity>): Promise<OrderItemEntity> {
    return this.orderItemService.create(dto);
  }

  @Get()
  async findAll(): Promise<OrderItemEntity[]> {
    return this.orderItemService.findAll();
  }
}
