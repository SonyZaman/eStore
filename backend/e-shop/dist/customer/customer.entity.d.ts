import { OrderEntity } from '../order/order.entity';
export declare class CustomerEntity {
    id: number;
    name: string;
    email: string;
    password: string;
    contactNumber: string;
    address: string;
    orders: OrderEntity[];
}
