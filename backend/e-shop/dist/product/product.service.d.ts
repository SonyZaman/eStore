import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductService {
    private productRepository;
    constructor(productRepository: Repository<ProductEntity>);
    create(createProductDto: CreateProductDto): Promise<ProductEntity>;
    findAll(): Promise<ProductEntity[]>;
    update(id: number, updateProductDto: CreateProductDto): Promise<ProductEntity>;
    remove(id: number): Promise<void>;
}
