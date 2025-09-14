
// // auth.controller.ts
// import { Body, Controller, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { CreateSellerDto } from 'src/seller/dto/create-seller.dto';
// import { LoginDto} from './dto/login.dto';
// import { ForgotPasswordDto, ResetPasswordDto } from './dto/login.dto';

// @Controller('auth')
// export class AuthController {
//   constructor(private authService: AuthService) {}

//   @Post('register')
//   @UsePipes(new ValidationPipe()) // ValidationPipe for validating the data
//   async register(@Body() createSellerDto: CreateSellerDto) {
//     return await this.authService.signUp(createSellerDto);
//   }

//    @Post('login')
//   async login(@Body() loginDto: LoginDto) {
//     return this.authService.signIn(loginDto); // Passing loginDto to AuthService
//   }


 
// }