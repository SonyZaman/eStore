// import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
// import { SellerService } from './seller.service';
// import { UpdateSellerDto } from './dto/update-seller.dto';
// import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

// @Controller('sellers')
// export class SellerController {
//   constructor(private readonly sellerService: SellerService) {}



//   // Get all sellers
//   @UseGuards(JwtAuthGuard)
//   @Get()
//   async findAll() {
//     return await this.sellerService.findAll();
//   }


//   @Get('all')
//   async findAll2() {
//     return await this.sellerService.findAll();
//   }

//   // Get seller by email
//   @UseGuards(JwtAuthGuard)
//   @Get(':id')
//   async findOne(@Param('id') id: number) {
//     return await this.sellerService.findOne(id);
//   }

//     // Get seller by ID
//   // @Get(':id')
//   // async findOneByID(@Param('id') id: number) {
//   //   return await this.sellerService.findOneByID(id); // Find seller by ID
//   // }

//   // Update seller details
//   @UseGuards(JwtAuthGuard)
//   @Put('update/:id')
//   async update(
//     @Param('id') id: number,
//     @Body() updateSellerDto: UpdateSellerDto,
//   ) {
//     return await this.sellerService.update(id, updateSellerDto);
//   }

//   // Delete seller
//   @UseGuards(JwtAuthGuard)
//   @Delete('delete/:id')
//   async remove(@Param('id') id: number) {
//     return await this.sellerService.remove(id);
//   }
// }
