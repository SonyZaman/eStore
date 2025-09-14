import { CustomerEntity } from '../customer/customer.entity';
import { OrderItemEntity } from '../order-item/order-item.entity';
export declare class OrderEntity {
    id: number;
    totalAmount: number;
    status: string;
    customer: CustomerEntity;
    orderItems: OrderItemEntity[];
}
