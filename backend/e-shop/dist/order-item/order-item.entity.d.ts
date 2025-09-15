import { OrderEntity } from '../order/order.entity';
import { ProductEntity } from '../product/product.entity';
export declare class OrderItemEntity {
    id: number;
    quantity: number;
    order: OrderEntity;
    product: ProductEntity;
}
