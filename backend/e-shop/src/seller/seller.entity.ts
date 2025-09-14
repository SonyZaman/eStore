// import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
// import { ProductEntity } from '../product/product.entity';


// @Entity('sellers')
// export class SellerEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   name: string;

//   @Column()
//   email: string;

//   @Column()
//   password: string;

//   @Column({ default: true })
//   isActive: boolean;

//   @Column()
//   storeName: string; // Store name

//   @Column({ type: 'text', nullable: true })
//   storeDescription: string; // Store description

//   @Column({ nullable: true })
//   contactNumber: string; // Contact number

//   @Column({ nullable: true })
//   address: string; // Address

//   @OneToMany(() => ProductEntity, product => product.seller)
//   products: ProductEntity[]; // One-to-many relationship with Product


  
// }
