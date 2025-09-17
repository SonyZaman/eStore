import { ProductService } from './product.service';
import { ProductEntity } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(dto: CreateProductDto): Promise<ProductEntity>;
    findAll(): Promise<ProductEntity[]>;
    updateProductById(id: number, updateProductDto: CreateProductDto): Promise<ProductEntity>;
    remove(id: number): Promise<void>;
    getProduct(id: string): Promise<ProductEntity>;
    findByVendor(vendorId: number): Promise<ProductEntity[]>;
}
