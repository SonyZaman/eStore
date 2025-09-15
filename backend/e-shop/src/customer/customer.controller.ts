import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerEntity } from './customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // Register a new customer
  @Post('register')
  async register(@Body() dto: CreateCustomerDto): Promise<CustomerEntity> {
    return this.customerService.createCustomer(dto);
  }

  // Get all customers
  @Get()
  async findAll(): Promise<CustomerEntity[]> {
    return this.customerService.findAll();
  }

  // Get customer by ID
//   @Get(':id')
//   async findOne(@Param('id') id: number): Promise<CustomerEntity> {
//     return this.customerService.findOne(id);
//   }
}
