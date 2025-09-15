import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>,
  ) {}

  // Register a new customer
  async createCustomer(dto: CreateCustomerDto): Promise<CustomerEntity> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const customer = this.customerRepository.create({
      ...dto,
      password: hashedPassword,
    });

    return this.customerRepository.save(customer);
  }

  // Get all customers
  async findAll(): Promise<CustomerEntity[]> {
    return this.customerRepository.find();
  }

//   // Get single customer by ID
//   async findOne(id: number): Promise<CustomerEntity> {
//     return this.customerRepository.findOne({ where: { id } });
//   }
}
