import { CustomerEntity } from '../customer/customer.entity';
import { OrderItemEntity } from '../order-item/order-item.entity';
export declare class OrderEntity {
    id: number;
    status: string;
    totalPrice: number;
    customer: CustomerEntity;
    orderItems: OrderItemEntity[];
}
