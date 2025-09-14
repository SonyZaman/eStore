import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

//   @Get(':id')
//   findOne(@Param('id') id: number) {
//     return this.customerService.findOne(id);
//   }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCustomerDto: CreateCustomerDto) {
    return this.customerService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.customerService.remove(id);
  }
}
