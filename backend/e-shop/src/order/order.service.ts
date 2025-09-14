import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
  ) {}

  create(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    const order = this.orderRepository.create(createOrderDto);
    return this.orderRepository.save(order);
  }

  findAll(): Promise<OrderEntity[]> {
    return this.orderRepository.find();
  }

//   findOne(id: number): Promise<OrderEntity> {
//     return this.orderRepository.findOne(id);
//   }
}
