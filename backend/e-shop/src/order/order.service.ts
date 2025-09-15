import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './order.entity';
import { OrderItemService } from '../order-item/order-item.service';
import { CustomerEntity } from '../customer/customer.entity';
import { ProductEntity } from '../product/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateOrderItemDto } from '../order-item/dto/create-order-item.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    private orderItemService: OrderItemService,
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>,
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async create(dto: CreateOrderDto): Promise<OrderEntity> {
    const customer = await this.customerRepository.findOne({ where: { id: dto.customerId } });
    if (!customer) throw new Error('Customer not found');

    const order = new OrderEntity();
    order.customer = customer;
    order.status = dto.status || 'pending';
    order.totalPrice = 0;

    const savedOrder = await this.orderRepository.save(order);

    // Calculate total price
    let total = 0;
    if (!Array.isArray(dto.orderItems)) throw new Error('dto.orderItems must be an array');

    for (const itemDto of dto.orderItems) {
      const product = await this.productRepository.findOne({ where: { id: itemDto.productId } });
      if (!product) throw new Error(`Product with id ${itemDto.productId} not found`);

      const orderItem = await this.orderItemService.create({
        orderId: savedOrder.id,
        productId: product.id,
        quantity: itemDto.quantity,
      } as CreateOrderItemDto);

      total += product.price * itemDto.quantity;
    }

    savedOrder.totalPrice = total;
    return this.orderRepository.save(savedOrder);
  }

  async findAll(): Promise<OrderEntity[]> {
    return this.orderRepository.find({ relations: ['customer', 'orderItems'] });
  }
}
