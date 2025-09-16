import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { VendorEntity } from '../vendor/vendor.entity';
import { CategoryEntity } from '../category/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    @InjectRepository(VendorEntity)
    private vendorRepository: Repository<VendorEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async createProduct(dto: any): Promise<ProductEntity> {
    const product = new ProductEntity();
    product.title = dto.title;
    product.description = dto.description;
    product.price = dto.price;
    product.productType = dto.productType;
    product.imageUrl = dto.imageUrl || ''; 

    // Find the Vendor entity by id
    const vendor = await this.vendorRepository.findOne({ where: { id: dto.vendorId } });
    if (!vendor) throw new Error('Vendor not found');
    product.vendor = vendor;

    // Find the Category entity by id
    const category = await this.categoryRepository.findOne({ where: { id: dto.categoryId } });
    if (!category) throw new Error('Category not found');
    product.category = category;

    return this.productRepository.save(product);
  }
  findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  // findOne(id: number): Promise<ProductEntity> {
  //   return this.productRepository.findOne(id);
  // }

  // update(id: number, updateProductDto: CreateProductDto): Promise<ProductEntity> {
  //   return this.productRepository.save({ ...updateProductDto, id });
  // }

  remove(id: number): Promise<void> {
    return this.productRepository.delete(id).then(() => undefined);
  }

    // Fetch products by vendor ID
  async findByVendor(vendorId: number): Promise<ProductEntity[]> {
    return this.productRepository.find({
      where: { vendor: { id: vendorId } },  // Find products where the vendor ID matches
      relations: ['vendor'],  // Ensure vendor relation is loaded
    });
  }
}
