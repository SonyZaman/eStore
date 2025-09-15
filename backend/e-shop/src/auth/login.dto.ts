// auth.dto.ts
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

// DTO for Login (Sign-In)
export class LoginDto {

  

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}



