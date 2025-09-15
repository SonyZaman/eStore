import { VendorService } from '../vendor/vendor.service';
import { VendorEntity } from '../vendor/vendor.entity';
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly vendorService;
    constructor(vendorService: VendorService);
    validate(payload: any): Promise<VendorEntity>;
}
export {};
