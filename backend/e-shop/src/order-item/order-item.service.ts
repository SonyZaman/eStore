import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItemEntity } from './order-item.entity';
import { CreateOrderItemDto } from './dto/create-order-item.dto';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItemEntity)
    private orderItemRepository: Repository<OrderItemEntity>,
  ) {}

  create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItemEntity> {
    const orderItem = this.orderItemRepository.create(createOrderItemDto);
    return this.orderItemRepository.save(orderItem);
  }

  findAll(): Promise<OrderItemEntity[]> {
    return this.orderItemRepository.find();
  }

//   findOne(id: number): Promise<OrderItemEntity> {
//     return this.orderItemRepository.findOne(id);
//   }

  update(id: number, updateOrderItemDto: CreateOrderItemDto): Promise<OrderItemEntity> {
    return this.orderItemRepository.save({ ...updateOrderItemDto, id });
  }

  remove(id: number): Promise<void> {
    return this.orderItemRepository.delete(id).then(() => undefined);
  }
}
