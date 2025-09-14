// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { SellerEntity } from './seller.entity';
// import { UpdateSellerDto } from './dto/update-seller.dto';
// import { CreateSellerDto } from './dto/create-seller.dto';



// @Injectable()
// export class SellerService {
//   constructor(
//     @InjectRepository(SellerEntity)
//     private sellerRepository: Repository<SellerEntity>,
//   ) {}


// //create

//   async create(createSellerDto: CreateSellerDto): Promise<SellerEntity> {
//     const seller = this.sellerRepository.create(createSellerDto);
//     return await this.sellerRepository.save(seller);
//   }

//   // Get all sellers
//   async findAll(): Promise<SellerEntity[]> {
//     return await this.sellerRepository.find();
//   }

//   // Get seller by id
//   async findOne(id: number): Promise<SellerEntity> {
//     const seller = await this.sellerRepository.findOne({ where: { id } });
//     if (!seller) {
//       throw new Error(`Seller with id ${id} not found`);
//     }
//     return seller;
//   }




//    // Get seller by id
//   async findOneByEmail(email: string): Promise<SellerEntity> {
//     const seller = await this.sellerRepository.findOne({ where: { email } });
//     if (!seller) {
//       throw new Error(`Seller with id ${email} not found`);
//     }
//     return seller;
//   }



//   // Update seller details
//   async update(id: number, updateSellerDto: UpdateSellerDto): Promise<SellerEntity> {
//     await this.sellerRepository.update(id, updateSellerDto);
//     const seller = await this.sellerRepository.findOne({ where: { id } });
//     if (!seller) {
//       throw new Error(`Seller with id ${id} not found`);
//     }
//     return seller;
//   }

//   // Delete a seller
//   async remove(id: number): Promise<void> {
//     await this.sellerRepository.delete(id);
//   }
// }
