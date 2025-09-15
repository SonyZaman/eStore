import { IsNumber, IsArray, IsOptional, IsString } from 'class-validator';
import { CreateOrderItemDto } from '../../order-item/dto/create-order-item.dto';

export class CreateOrderDto {
  @IsNumber()
  customerId: number;

  @IsOptional()
  @IsString()
  status?: string;  // optional

  @IsArray()
  orderItems: CreateOrderItemDto[];
}
