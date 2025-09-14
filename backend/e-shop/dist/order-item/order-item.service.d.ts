import { Repository } from 'typeorm';
import { OrderItemEntity } from './order-item.entity';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
export declare class OrderItemService {
    private orderItemRepository;
    constructor(orderItemRepository: Repository<OrderItemEntity>);
    create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItemEntity>;
    findAll(): Promise<OrderItemEntity[]>;
    update(id: number, updateOrderItemDto: CreateOrderItemDto): Promise<OrderItemEntity>;
    remove(id: number): Promise<void>;
}
