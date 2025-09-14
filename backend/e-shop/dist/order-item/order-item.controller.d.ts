import { OrderItemService } from './order-item.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
export declare class OrderItemController {
    private readonly orderItemService;
    constructor(orderItemService: OrderItemService);
    create(createOrderItemDto: CreateOrderItemDto): Promise<import("./order-item.entity").OrderItemEntity>;
    findAll(): Promise<import("./order-item.entity").OrderItemEntity[]>;
    update(id: number, updateOrderItemDto: CreateOrderItemDto): Promise<import("./order-item.entity").OrderItemEntity>;
    remove(id: number): Promise<void>;
}
