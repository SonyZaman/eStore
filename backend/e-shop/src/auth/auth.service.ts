// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { VendorService } from '../vendor/vendor.service';
import { LoginDto } from './login.dto'; // Login DTO for validation
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private vendorService: VendorService, 
   // private mailService: MailService,
    private jwtService: JwtService
  ) {}

  // Sign in to generate JWT token
  // auth.service.ts
   async signIn(loginDto: LoginDto): Promise<{ access_token: string }> {
    const vendor = await this.vendorService.findByEmail(loginDto.email);  // This line expects `email` field
    if (!vendor) {
        throw new UnauthorizedException('Invalid credentials');
    }

    if (loginDto.password !== vendor.password) {
      throw new UnauthorizedException('Invalid credentials'); // password mismatch
    }


    const payload = { email: vendor.email, sub: vendor.id }; // Payload for the JWT token
    return {
        access_token: await this.jwtService.signAsync(payload), // Generate JWT token
    };
}


}


