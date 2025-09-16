// auth.controller.ts
import { Body, Controller, Param, Post, UnauthorizedException, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto'; // DTO for login
import { PusherService } from '../notifications/pusher.service';  // Import PusherService
import { VendorService } from '../vendor/vendor.service';

class VerifyOtpDto {
  email: string;  // Vendor's email
  otp: string;    // OTP entered by the user
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService,
    private readonly pusherService: PusherService, // Inject PusherService
    private readonly vendorService: VendorService
  ) {}

   @Post('login')
  async login(@Body() loginDto: LoginDto) {

      // Perform login logic
    const vendor = await this.authService.validateUser(loginDto);

    await this.vendorService.updateOtpByEmailAndEmailPassTOMailer(vendor.email);


    await this.pusherService.sendLoginNotification(vendor.email);
    return this.authService.signIn(loginDto); // Passing loginDto to AuthService
  }


   @Post('verify-otp')
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    const { email, otp } = verifyOtpDto;  // Destructure email and otp from request body
    return this.vendorService.verifyOtpByEmail(email, otp);  // Call service to verify OTP
  }



 
}

