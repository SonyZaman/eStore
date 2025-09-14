import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ProductEntity } from '../product/product.entity';  // Import Product entity
import { OrderEntity } from '../order/order.entity';  // Import Order entity

@Entity('order_items')
export class OrderItemEntity {
  @PrimaryGeneratedColumn()
  id: number;  // Unique identifier for the order item

  @Column()
  quantity: number;  // Quantity of the product in this order item

  @Column('decimal')
  price: number;  // Price of the product at the time of purchase

  @ManyToOne(() => OrderEntity, order => order.orderItems)  // Many order items belong to one order
  @JoinColumn({ name: 'orderId' })
  order: OrderEntity;  // Reference to the order this item belongs to

  @ManyToOne(() => ProductEntity, product => product.orderItems)  // Many order items belong to one product
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;  // Product being sold in this order item
}
