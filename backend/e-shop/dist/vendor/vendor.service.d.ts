import { Repository } from 'typeorm';
import { VendorEntity } from './vendor.entity';
import { CreateVendorDto } from './dto/create-vendor.dto';
export declare class VendorService {
    private vendorRepository;
    constructor(vendorRepository: Repository<VendorEntity>);
    create(createVendorDto: CreateVendorDto): Promise<VendorEntity>;
    findAll(): Promise<VendorEntity[]>;
    findByEmail(email: string): Promise<VendorEntity>;
    findOne(id: number): Promise<VendorEntity>;
    update(id: number, updateVendorDto: CreateVendorDto): Promise<VendorEntity>;
    remove(id: number): Promise<void>;
}
