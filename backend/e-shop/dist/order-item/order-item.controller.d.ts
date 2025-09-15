import { OrderItemService } from './order-item.service';
import { OrderItemEntity } from './order-item.entity';
export declare class OrderItemController {
    private readonly orderItemService;
    constructor(orderItemService: OrderItemService);
    create(dto: Partial<OrderItemEntity>): Promise<OrderItemEntity>;
    findAll(): Promise<OrderItemEntity[]>;
}
