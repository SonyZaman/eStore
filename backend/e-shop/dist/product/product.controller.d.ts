import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: CreateProductDto): Promise<import("./product.entity").ProductEntity>;
    findAll(): Promise<import("./product.entity").ProductEntity[]>;
    update(id: number, updateProductDto: CreateProductDto): Promise<import("./product.entity").ProductEntity>;
    remove(id: number): Promise<void>;
}
