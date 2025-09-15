import { Repository } from 'typeorm';
import { OrderItemEntity } from './order-item.entity';
export declare class OrderItemService {
    private orderItemRepository;
    constructor(orderItemRepository: Repository<OrderItemEntity>);
    create(orderItem: Partial<OrderItemEntity>): Promise<OrderItemEntity>;
    findAll(): Promise<OrderItemEntity[]>;
}
