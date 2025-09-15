// auth.controller.ts
import { Body, Controller, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto'; // DTO for login


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

   @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto); // Passing loginDto to AuthService
  }


 
}

