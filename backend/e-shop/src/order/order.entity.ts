import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { CustomerEntity } from '../customer/customer.entity';
import { OrderItemEntity } from '../order-item/order-item.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'pending' })
  status: string;

  @Column({ type: 'decimal', default: 0 })
  totalPrice: number;

  @ManyToOne(() => CustomerEntity, (customer) => customer.orders, { eager: true })
  customer: CustomerEntity;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order, { cascade: true, eager: true })
  orderItems: OrderItemEntity[];
}
