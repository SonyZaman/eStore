import { VendorEntity } from '../vendor/vendor.entity';
import { CategoryEntity } from '../category/category.entity';
import { OrderItemEntity } from '../order-item/order-item.entity';
export declare class ProductEntity {
    id: number;
    title: string;
    description: string;
    price: number;
    productType: string;
    vendor: VendorEntity;
    category: CategoryEntity;
    orderItems: OrderItemEntity[];
}
