import { Repository } from 'typeorm';
import { OrderEntity } from './order.entity';
import { OrderItemService } from '../order-item/order-item.service';
import { CustomerEntity } from '../customer/customer.entity';
import { ProductEntity } from '../product/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrderService {
    private orderRepository;
    private orderItemService;
    private customerRepository;
    private productRepository;
    constructor(orderRepository: Repository<OrderEntity>, orderItemService: OrderItemService, customerRepository: Repository<CustomerEntity>, productRepository: Repository<ProductEntity>);
    create(dto: CreateOrderDto): Promise<OrderEntity>;
    findAll(): Promise<OrderEntity[]>;
}
