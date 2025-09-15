import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';

@Controller('vendors')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}


  

  //registration
  @Post()
  create(@Body() createVendorDto: CreateVendorDto) {
    return this.vendorService.create(createVendorDto);
  }

  @Get()
  findAll() {
    return this.vendorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.vendorService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateVendorDto: CreateVendorDto) {
    return this.vendorService.update(id, updateVendorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.vendorService.remove(id);
  }
}
