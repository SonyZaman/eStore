import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  // findOne(id: number): Promise<ProductEntity> {
  //   return this.productRepository.findOne(id);
  // }

  update(id: number, updateProductDto: CreateProductDto): Promise<ProductEntity> {
    return this.productRepository.save({ ...updateProductDto, id });
  }

  remove(id: number): Promise<void> {
    return this.productRepository.delete(id).then(() => undefined);
  }
}
