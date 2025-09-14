import { ProductEntity } from '../product/product.entity';
import { OrderEntity } from '../order/order.entity';
export declare class OrderItemEntity {
    id: number;
    quantity: number;
    price: number;
    order: OrderEntity;
    product: ProductEntity;
}
