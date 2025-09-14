// // auth.service.ts
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { SellerService } from '../seller/seller.service';
// import { CreateSellerDto } from 'src/seller/dto/create-seller.dto';
// import { LoginDto} from './dto/login.dto';
// import * as bcrypt from 'bcrypt';
// //import { MailService } from 'src/mail/mailer.service';
// //import { ForgotPasswordDto, ResetPasswordDto } from './dto/auth.dto';

// @Injectable()
// export class AuthService {
//   constructor(
//     private sellerService: SellerService, 
//    // private mailService: MailService,
//     private jwtService: JwtService
//   ) {}

//   // Sign up a new seller
//   async signUp(createSellerDto: CreateSellerDto): Promise<CreateSellerDto> {
//     // Hash the password before storing
//     const salt = await bcrypt.genSalt();
//     const hashedPassword = await bcrypt.hash(createSellerDto.password, salt); 
//     createSellerDto.password = hashedPassword; // Set the hashed password
//     return await this.sellerService.create(createSellerDto); // Save the seller
//   }

//   // Sign in to generate JWT token
//   // auth.service.ts
//    async signIn(loginDto: LoginDto): Promise<{ access_token: string }> {
//     const seller = await this.sellerService.findOne(loginDto.id);  // This line expects `email` field
//     if (!seller) {
//         throw new UnauthorizedException('Invalid credentials');
//     }

//     // Compare the password
//     const isMatch = await bcrypt.compare(loginDto.password, seller.password);
//     if (!isMatch) {
//         throw new UnauthorizedException('Invalid credentials');
//     }

//     const payload = { email: seller.email, sub: seller.id }; // Payload for the JWT token
//     return {
//         access_token: await this.jwtService.signAsync(payload), // Generate JWT token
//     };
// }








// }