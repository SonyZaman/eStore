import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { VendorService } from '../vendor/vendor.service';
declare class VerifyOtpDto {
    email: string;
    otp: string;
}
export declare class AuthController {
    private authService;
    private readonly vendorService;
    constructor(authService: AuthService, vendorService: VendorService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
    verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<{
        message: string;
    }>;
}
export {};
