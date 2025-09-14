import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';

@Controller('order-items')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemService.create(createOrderItemDto);
  }

  @Get()
  findAll() {
    return this.orderItemService.findAll();
  }

//   @Get(':id')
//   findOne(@Param('id') id: number) {
//     return this.orderItemService.findOne(id);
//   }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateOrderItemDto: CreateOrderItemDto) {
    return this.orderItemService.update(id, updateOrderItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.orderItemService.remove(id);
  }
}
