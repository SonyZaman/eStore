import { Repository } from 'typeorm';
import { OrderEntity } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrderService {
    private orderRepository;
    constructor(orderRepository: Repository<OrderEntity>);
    create(createOrderDto: CreateOrderDto): Promise<OrderEntity>;
    findAll(): Promise<OrderEntity[]>;
}
