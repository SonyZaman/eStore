export class CreateOrderDto {
  customerId: number;          // Customer who placed the order
  orderDate?: Date;            // Optional: defaults to current date
  status?: string;             // e.g., 'Pending', 'Shipped', 'Delivered'
}
