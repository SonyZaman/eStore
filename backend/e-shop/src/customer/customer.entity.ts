import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrderEntity } from '../order/order.entity';  // Import Order entity

@Entity('customers')
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id: number;  // Unique identifier for the customer

  @Column()
  name: string;  // Customer's name

  @Column()
  email: string;  // Customer's email address

  @Column()
  password: string;  // Customer's password

  @OneToMany(() => OrderEntity, order => order.customer)  // One customer can have many orders
  orders: OrderEntity[];  // List of orders placed by the customer
}
