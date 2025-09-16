import { Repository } from 'typeorm';
import { VendorEntity } from './vendor.entity';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '../mailer/mailer.service';
export declare class VendorService {
    private vendorRepository;
    private readonly mailerService;
    private readonly jwtService;
    constructor(vendorRepository: Repository<VendorEntity>, mailerService: MailerService, jwtService: JwtService);
    private generateOtp;
    updateOtpByEmailAndEmailPassTOMailer(email: string): Promise<{
        message: string;
    }>;
    verifyOtpByEmail(email: string, otp: string): Promise<{
        message: string;
    }>;
    create(createVendorDto: CreateVendorDto): Promise<VendorEntity>;
    findAll(): Promise<VendorEntity[]>;
    findByEmail(email: string): Promise<VendorEntity>;
    findOne(id: number): Promise<VendorEntity>;
    update(id: number, updateVendorDto: CreateVendorDto): Promise<VendorEntity>;
    remove(id: number): Promise<void>;
}
