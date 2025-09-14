// auth.dto.ts
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

// DTO for Login (Sign-In)
export class LoginDto {

  
  id: number;
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}


export class ForgotPasswordDto {

  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
 
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
