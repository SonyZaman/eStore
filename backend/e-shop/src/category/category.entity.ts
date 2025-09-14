import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductEntity } from '../product/product.entity';  // Import Product entity

@Entity('categories')  // This will be the table name in the database
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;  // Unique identifier for each category

  @Column()
  name: string;  // Name of the category (e.g., "Electronics", "Clothing")

  @OneToMany(() => ProductEntity, product => product.category)  // One-to-many relationship with ProductEntity
  products: ProductEntity[];  // List of products in this category
}
