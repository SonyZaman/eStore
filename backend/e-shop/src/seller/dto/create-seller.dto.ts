import { IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";

export class CreateSellerDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  isActive: boolean;

  @IsString()
  storeName: string;

  @IsString()
  @IsOptional()
  storeDescription: string;

  @IsString()
  @IsOptional()
  contactNumber: string;

  @IsString()
  @IsOptional()
  address: string;
}