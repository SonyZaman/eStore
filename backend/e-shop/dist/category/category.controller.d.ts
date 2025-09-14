import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategoryDto: CreateCategoryDto): Promise<import("./category.entity").CategoryEntity>;
    findAll(): Promise<import("./category.entity").CategoryEntity[]>;
    update(id: number, updateCategoryDto: CreateCategoryDto): Promise<import("./category.entity").CategoryEntity>;
    remove(id: number): Promise<void>;
}
