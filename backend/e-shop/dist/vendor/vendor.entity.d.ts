import { ProductEntity } from '../product/product.entity';
export declare class VendorEntity {
    id: number;
    name: string;
    email: string;
    password: string;
    isActive: boolean;
    storeName: string;
    storeDescription: string;
    contactNumber: string;
    address: string;
    products: ProductEntity[];
}
