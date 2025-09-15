import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrderEntity } from '../order/order.entity';

@Entity('customers')
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  contactNumber: string;

  @Column({ nullable: true })
  address: string;

  @OneToMany(() => OrderEntity, order => order.customer)
  orders: OrderEntity[];
}
