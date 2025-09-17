import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { VendorEntity } from '../vendor/vendor.entity';
import { CategoryEntity } from '../category/category.entity';
import { PusherService } from '../notifications/pusher.service';
export declare class ProductService {
    private productRepository;
    private vendorRepository;
    private categoryRepository;
    private readonly pusherService;
    constructor(productRepository: Repository<ProductEntity>, vendorRepository: Repository<VendorEntity>, categoryRepository: Repository<CategoryEntity>, pusherService: PusherService);
    createProduct(dto: any): Promise<ProductEntity>;
    findAll(): Promise<ProductEntity[]>;
    getProductById(productId: number): Promise<ProductEntity>;
    remove(id: number): Promise<void>;
    updateProductById(id: number, updateProductDto: any): Promise<ProductEntity>;
    findByVendor(vendorId: number): Promise<ProductEntity[]>;
}
