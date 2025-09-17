import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { VendorEntity } from '../vendor/vendor.entity';
import { CategoryEntity } from '../category/category.entity';
import { PusherService } from '../notifications/pusher.service';  // Import PusherService

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    @InjectRepository(VendorEntity)
    private vendorRepository: Repository<VendorEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    private readonly pusherService: PusherService,  // Inject PusherService
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

    const savedProduct = await this.productRepository.save(product);

    // Find the Category entity by id
    const category = await this.categoryRepository.findOne({ where: { id: dto.categoryId } });
    if (!category) throw new Error('Category not found');
    product.category = category;

        // Trigger Pusher event for product creation
    this.pusherService.sendProductNotification('product-created', `${savedProduct.title} was created by ${vendor.name}`, savedProduct);

    return savedProduct;
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

    async getProductById(productId: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }

    return product;
  }

 async remove(id: number): Promise<void> {
  const product = await this.productRepository.findOne({ where: { id }, relations: ['vendor'] });

  if (!product) {
    throw new Error('Product not found');
  }

  // Trigger Pusher event for product deletion
  await this.pusherService.sendProductNotification(
    'product-deleted',
    `${product.title} was deleted by ${product.vendor.name}`,
    product
  );

  // Perform the deletion
  await this.productRepository.delete(id);
}


    // Update a product by ID
  async updateProductById(id: number, updateProductDto: any): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) throw new Error('Product not found');
    
    // Update product details
    product.title = updateProductDto.title || product.title;
    product.description = updateProductDto.description || product.description;
    product.price = updateProductDto.price || product.price;
    product.productType = updateProductDto.productType || product.productType;
    product.imageUrl = updateProductDto.imageUrl || product.imageUrl;
    
    // Find and assign vendor and category
    if (updateProductDto.vendorId) {
      const vendor = await this.vendorRepository.findOne({ where: { id: updateProductDto.vendorId } });
      if (vendor) product.vendor = vendor;
    }

    if (updateProductDto.categoryId) {
      const category = await this.categoryRepository.findOne({ where: { id: updateProductDto.categoryId } });
      if (category) product.category = category;
    }

    // Save the updated product
    const updatedProduct = await this.productRepository.save(product);

    // Trigger Pusher event for product update
    this.pusherService.sendProductNotification('product-updated', `${updatedProduct.title} was updated by ${product.vendor.name}`, updatedProduct);

    return updatedProduct;
  }

    // Fetch products by vendor ID
  async findByVendor(vendorId: number): Promise<ProductEntity[]> {
    return this.productRepository.find({
      where: { vendor: { id: vendorId } },  // Find products where the vendor ID matches
      relations: ['vendor'],  // Ensure vendor relation is loaded
    });
  }



}
