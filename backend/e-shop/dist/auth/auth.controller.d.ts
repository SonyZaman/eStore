import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { PusherService } from '../notifications/pusher.service';
import { VendorService } from '../vendor/vendor.service';
declare class VerifyOtpDto {
    email: string;
    otp: string;
}
export declare class AuthController {
    private authService;
    private readonly pusherService;
    private readonly vendorService;
    constructor(authService: AuthService, pusherService: PusherService, vendorService: VendorService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
    verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<{
        message: string;
    }>;
}
export {};
