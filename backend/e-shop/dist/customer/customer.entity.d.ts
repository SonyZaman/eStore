import { OrderEntity } from '../order/order.entity';
export declare class CustomerEntity {
    id: number;
    name: string;
    email: string;
    password: string;
    orders: OrderEntity[];
}
