import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(createOrderDto: CreateOrderDto): Promise<import("./order.entity").OrderEntity>;
    findAll(): Promise<import("./order.entity").OrderEntity[]>;
}
