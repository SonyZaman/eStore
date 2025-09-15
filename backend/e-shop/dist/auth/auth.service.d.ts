import { JwtService } from '@nestjs/jwt';
import { VendorService } from '../vendor/vendor.service';
import { LoginDto } from './login.dto';
export declare class AuthService {
    private vendorService;
    private jwtService;
    constructor(vendorService: VendorService, jwtService: JwtService);
    signIn(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
}
