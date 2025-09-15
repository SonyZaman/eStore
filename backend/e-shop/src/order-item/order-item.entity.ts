import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { OrderEntity } from '../order/order.entity';
import { ProductEntity } from '../product/product.entity';

@Entity('order_items')
export class OrderItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => OrderEntity, order => order.orderItems)
  @Exclude() // Avoid circular JSON
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, { eager: true })
  product: ProductEntity;
}
