import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VendorEntity } from './vendor.entity';
import { CreateVendorDto } from './dto/create-vendor.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';  // To generate JWT

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(VendorEntity)
    private vendorRepository: Repository<VendorEntity>,
  ) {}

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
