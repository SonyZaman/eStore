import { IsString, IsEmail, IsBoolean, IsOptional } from 'class-validator';

export class UpdateSellerDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString()
  @IsOptional()
  storeName?: string;

  @IsString()
  @IsOptional()
  storeDescription?: string;

  @IsString()
  @IsOptional()
  contactNumber?: string;

  @IsString()
  @IsOptional()
  address?: string;
}
