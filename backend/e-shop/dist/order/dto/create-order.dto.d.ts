import { CreateOrderItemDto } from '../../order-item/dto/create-order-item.dto';
export declare class CreateOrderDto {
    customerId: number;
    status?: string;
    orderItems: CreateOrderItemDto[];
}
