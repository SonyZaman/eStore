// product.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { VendorEntity } from '../vendor/vendor.entity';  // Import Vendor entity
import { CategoryEntity } from '../category/category.entity';  // Import Category entity
import { OrderItemEntity } from '../order-item/order-item.entity';  // Import OrderItem entity

@Entity('products')  // This will be the table name in the database
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;  // Unique identifier for each product

  @Column()
  title: string;  // Product title

  @Column('text')
  description: string;  // Product description

  @Column('decimal')
  price: number;  // Product price

  @Column()
  productType: string;  // Product type (e.g., "Electronics", "Clothing")

  @Column({ nullable: true })
  imageUrl: string;  // Optional image URL for the product

  @ManyToOne(() => VendorEntity, vendor => vendor.products)  // Many-to-one relationship with VendorEntity
  @JoinColumn({ name: 'vendorId' })
  vendor: VendorEntity;  // Vendor associated with this product

  @ManyToOne(() => CategoryEntity, category => category.products)  // Many-to-one relationship with CategoryEntity
  @JoinColumn({ name: 'categoryId' })
  category: CategoryEntity;  // Category associated with this product

  @OneToMany(() => OrderItemEntity, orderItem => orderItem.product)  // One product can appear in many order items
  orderItems: OrderItemEntity[];  // List of order items that include this product
}
