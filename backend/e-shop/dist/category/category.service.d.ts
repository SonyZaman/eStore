import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoryService {
    private categoryRepository;
    constructor(categoryRepository: Repository<CategoryEntity>);
    create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity>;
    findAll(): Promise<CategoryEntity[]>;
    update(id: number, updateCategoryDto: CreateCategoryDto): Promise<CategoryEntity>;
    remove(id: number): Promise<void>;
}
