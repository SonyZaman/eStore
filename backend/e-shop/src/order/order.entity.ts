import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { CustomerEntity } from '../customer/customer.entity';  // Import Customer entity
import { OrderItemEntity } from '../order-item/order-item.entity';  // Import OrderItem entity

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;  // Unique identifier for the order

  @Column('decimal')
  totalAmount: number;  // Total price of the order

  @Column()
  status: string;  // Order status (e.g., "Pending", "Shipped", "Delivered")

  @ManyToOne(() => CustomerEntity, customer => customer.orders)  // Many orders can belong to one customer
  customer: CustomerEntity;  // Customer who placed this order

  @OneToMany(() => OrderItemEntity, orderItem => orderItem.order)  // One order can have multiple order items
  orderItems: OrderItemEntity[];  // List of order items in this order
}
