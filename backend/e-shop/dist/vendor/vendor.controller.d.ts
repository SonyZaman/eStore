import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
export declare class VendorController {
    private readonly vendorService;
    constructor(vendorService: VendorService);
    create(createVendorDto: CreateVendorDto): Promise<import("./vendor.entity").VendorEntity>;
    findAll(): Promise<import("./vendor.entity").VendorEntity[]>;
    findByEmail(email: string): Promise<import("./vendor.entity").VendorEntity>;
    findOne(id: number): Promise<import("./vendor.entity").VendorEntity>;
    update(id: number, updateVendorDto: CreateVendorDto): Promise<import("./vendor.entity").VendorEntity>;
    remove(id: number): Promise<void>;
}
