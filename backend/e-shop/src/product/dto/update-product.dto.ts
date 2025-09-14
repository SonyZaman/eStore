import { IsString, IsDecimal, IsOptional, IsInt } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDecimal()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  productType?: string; // New field for product type

  @IsInt()
  @IsOptional()
  sellerId?: number;
}
