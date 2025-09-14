import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VendorEntity } from './vendor.entity';
import { CreateVendorDto } from './dto/create-vendor.dto';

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
