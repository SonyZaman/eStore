export class CreateOrderItemDto {
  orderId: number;             // ID of the order
  productId: number;           // ID of the product
  quantity: number;            // Number of products
  price: number;               // Price of the product at the time of order
}
