import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>,
  ) {}

  create(createCustomerDto: CreateCustomerDto): Promise<CustomerEntity> {
    const customer = this.customerRepository.create(createCustomerDto);
    return this.customerRepository.save(customer);
  }

  findAll(): Promise<CustomerEntity[]> {
    return this.customerRepository.find();
  }

//   findOne(id: number): Promise<CustomerEntity> {
//     return this.customerRepository.findOne(id);
//   }

  update(id: number, updateCustomerDto: CreateCustomerDto): Promise<CustomerEntity> {
    return this.customerRepository.save({ ...updateCustomerDto, id });
  }

  remove(id: number): Promise<void> {
    return this.customerRepository.delete(id).then(() => undefined);
  }
}
