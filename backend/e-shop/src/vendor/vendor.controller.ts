import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@Controller('vendors')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}


  

  //registration
  @Post()
  create(@Body() createVendorDto: CreateVendorDto) {
    return this.vendorService.create(createVendorDto);
  }

    // Endpoint to update OTP by email without DTO
  // @Post('update-otp')
  // async updateOtp(@Body() body: { email: string }) {
  //   const { email } = body; // Extract the email from the body
  //   return this.vendorService.updateOtpByEmail(email); // Pass the email to the service
  // }

  @Get()
  findAll() {
    return this.vendorService.findAll();
  }

  // // Get logged-in vendor's profile info with JWT protection
  // @UseGuards(JwtAuthGuard)
  // @Get('me')
  // async getProfile(@Request() req) {
  //   const vendorId = req.user.id;  // Access the vendor ID from the JWT payload
  //   return this.vendorService.findOne(vendorId);
  // }

   @Get('email/:email')  // Use ':email' to capture the email as a parameter
  async findByEmail(@Param('email') email: string) {
    return this.vendorService.findByEmail(email);  // Use the findByEmail service method
  }



  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.vendorService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateVendorDto: CreateVendorDto) {
    return this.vendorService.update(id, updateVendorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.vendorService.remove(id);
  }
}
