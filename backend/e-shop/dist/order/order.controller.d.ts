import { OrderService } from './order.service';
import { OrderEntity } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(dto: CreateOrderDto): Promise<OrderEntity>;
}
