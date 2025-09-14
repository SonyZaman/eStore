import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  findAll(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find();
  }

//   findOne(id: number): Promise<CategoryEntity> {
//     return this.categoryRepository.findOne(id);
//   }

  update(id: number, updateCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    return this.categoryRepository.save({ ...updateCategoryDto, id });
  }

  remove(id: number): Promise<void> {
    return this.categoryRepository.delete(id).then(() => undefined);
  }
}
