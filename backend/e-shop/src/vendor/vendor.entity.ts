import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductEntity } from '../product/product.entity';  // Import Product entity

@Entity('vendors')  // Using the name 'vendors' for the table
export class VendorEntity {  // Renaming to VendorEntity
  @PrimaryGeneratedColumn()
  id: number;  // Unique identifier for the vendor

  @Column()
  name: string;  // Vendor's name

  @Column()
  email: string;  // Vendor's email address

  @Column()
  password: string;  // Vendor's password

  @Column({ default: true })
  isActive: boolean;  // To track if the vendor is active

  @Column()
  storeName: string;  // Vendor's store name

  @Column({ type: 'text', nullable: true })
  storeDescription: string;  // Optional store description

  @Column({ nullable: true })
  contactNumber: string;  // Vendor's contact number

  @Column({ nullable: true })
  address: string;  // Vendor's address

  @OneToMany(() => ProductEntity, product => product.vendor)  // Changed from seller to vendor
  products: ProductEntity[];  // One-to-many relation with the Product entity
}
