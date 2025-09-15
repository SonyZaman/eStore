import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderEntity } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() dto: CreateOrderDto): Promise<OrderEntity> {
    // Validate DTO
    await validateOrReject(plainToInstance(CreateOrderDto, dto));
    return this.orderService.create(dto);
  }

//   @Get()
//   async findAll(): Promise<OrderEntity[]> {
//     return this.orderService.findAll();
//   }

//   @Get(':id')
//   async findOne(@Param('id') id: number): Promise<OrderEntity> {
//     return this.orderService.findOne(Number(id));
//   }
}
