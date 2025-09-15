import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { VendorEntity } from '../vendor/vendor.entity';
import { CategoryEntity } from '../category/category.entity';
export declare class ProductService {
    private productRepository;
    private vendorRepository;
    private categoryRepository;
    constructor(productRepository: Repository<ProductEntity>, vendorRepository: Repository<VendorEntity>, categoryRepository: Repository<CategoryEntity>);
    createProduct(dto: any): Promise<ProductEntity>;
    findAll(): Promise<ProductEntity[]>;
    remove(id: number): Promise<void>;
}
