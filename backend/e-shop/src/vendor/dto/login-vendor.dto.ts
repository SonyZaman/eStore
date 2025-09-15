import { IsString, IsEmail } from 'class-validator';

export class LoginVendorDto {
  @IsEmail()
  email: string;  // Vendor's email address

  @IsString()
  password: string;  // Vendor's password
}
