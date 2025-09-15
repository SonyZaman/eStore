import { IsString, IsEmail, IsBoolean, IsOptional } from 'class-validator';

export class CreateVendorDto {
  @IsString()
  name: string;  // Vendor's name

  @IsEmail()
  email: string;  // Vendor's email address

  @IsString()
  password: string;  // Vendor's password

  @IsBoolean()
  @IsOptional()
  isActive: boolean = true;  // Vendor's active status (default: true)

  @IsString()
  storeName: string;  // Vendor's store name

  @IsString()
  @IsOptional()
  storeDescription?: string;  // Optional store description

  @IsString()
  @IsOptional()
  contactNumber?: string;  // Vendor's contact number

  @IsString()
  @IsOptional()
  address?: string;  // Vendor's address
}
