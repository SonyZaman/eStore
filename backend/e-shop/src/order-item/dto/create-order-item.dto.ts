import { IsInt } from 'class-validator';

export class CreateOrderItemDto {
  @IsInt()
  quantity: number;

  @IsInt()
  productId: number; // Pass product id, not the full object
}
