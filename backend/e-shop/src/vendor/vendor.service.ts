import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VendorEntity } from './vendor.entity';
import { CreateVendorDto } from './dto/create-vendor.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';  // To generate JWT
import { MailerService } from '../mailer/mailer.service'; // For sending OTP email

@Injectable()
export class VendorService {
    constructor(
    @InjectRepository(VendorEntity)
    private vendorRepository: Repository<VendorEntity>,
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService, // Inject JWT service
  ) {}


   // Generate OTP
  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  }

 // Update OTP by Email
  async updateOtpByEmailAndEmailPassTOMailer(email: string): Promise<{ message: string }> {
    // Find the vendor by email
    const vendor = await this.vendorRepository.findOne({ where: { email } });

    if (!vendor) {
      throw new Error('Vendor not found');  // Handle vendor not found case
    }

    // Generate a new OTP
    const otp = this.generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);  // OTP expiration time (10 minutes)

    // Update the OTP and expiration time in the database
    vendor.otp = otp;

    // Save the updated vendor record
    await this.vendorRepository.save(vendor);

    // Send OTP email to the vendor
    await this.mailerService.sendOtpEmail(vendor.email, otp);  // Assuming you have a sendOtpEmail method

    return { message: 'OTP sent to your email. Please verify to complete registration.' };
  }


   // Method to verify OTP by email
  async verifyOtpByEmail(email: string, otp: string): Promise<{ message: string }> {
    // Find vendor by email
    const vendor = await this.vendorRepository.findOne({ where: { email } });

    if (!vendor) {
      throw new Error('Vendor not found');  // Handle case when vendor is not found
    }

    // Check if OTP matches
    if (vendor.otp !== otp) {
      throw new Error('Invalid OTP');  // Handle invalid OTP
    }

    return { message: 'OTP verified successfully' };  // Return success message
  }

  create(createVendorDto: CreateVendorDto): Promise<VendorEntity> {

    const vendor = this.vendorRepository.create(createVendorDto);
    return this.vendorRepository.save(vendor);
  }

  findAll(): Promise<VendorEntity[]> {
    return this.vendorRepository.find();
  }

  // Find Vendor by Email (for login)
  async findByEmail(email: string): Promise<VendorEntity> {
    const vendor = await this.vendorRepository.findOne({
      where: { email },
    });

    if (!vendor) {
      throw new Error('Vendor not found');  // Handle case where vendor is not found
    }

    return vendor;
  }

   // Find a vendor by id
  findOne(id: number): Promise<VendorEntity> {
  return this.vendorRepository.find({ where: { id } }).then(vendors => vendors[0]);  // find() returns an array
  }

  update(id: number, updateVendorDto: CreateVendorDto): Promise<VendorEntity> {
    return this.vendorRepository.save({ ...updateVendorDto, id });
  }

  remove(id: number): Promise<void> {
    return this.vendorRepository.delete(id).then(() => undefined);
  }
}
