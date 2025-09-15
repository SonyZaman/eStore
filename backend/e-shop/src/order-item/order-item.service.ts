import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItemEntity } from './order-item.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItemEntity)
    private orderItemRepository: Repository<OrderItemEntity>,
  ) {}

  async create(orderItem: Partial<OrderItemEntity>): Promise<OrderItemEntity> {
    const newItem = this.orderItemRepository.create(orderItem);
    return this.orderItemRepository.save(newItem);
  }

  async findAll(): Promise<OrderItemEntity[]> {
    return this.orderItemRepository.find();
  }
}
