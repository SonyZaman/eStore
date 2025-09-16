import { JwtService } from '@nestjs/jwt';
import { VendorService } from '../vendor/vendor.service';
import { LoginDto } from './login.dto';
export declare class AuthService {
    private vendorService;
    private jwtService;
    constructor(vendorService: VendorService, jwtService: JwtService);
    validateUser(loginDto: LoginDto): Promise<import("../vendor/vendor.entity").VendorEntity>;
    signIn(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
}
