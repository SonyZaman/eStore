"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const vendor_entity_1 = require("./vendor.entity");
const jwt_1 = require("@nestjs/jwt");
const mailer_service_1 = require("../mailer/mailer.service");
let VendorService = class VendorService {
    vendorRepository;
    mailerService;
    jwtService;
    constructor(vendorRepository, mailerService, jwtService) {
        this.vendorRepository = vendorRepository;
        this.mailerService = mailerService;
        this.jwtService = jwtService;
    }
    generateOtp() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    async updateOtpByEmailAndEmailPassTOMailer(email) {
        const vendor = await this.vendorRepository.findOne({ where: { email } });
        if (!vendor) {
            throw new Error('Vendor not found');
        }
        const otp = this.generateOtp();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
        vendor.otp = otp;
        await this.vendorRepository.save(vendor);
        await this.mailerService.sendOtpEmail(vendor.email, otp);
        return { message: 'OTP sent to your email. Please verify to complete registration.' };
    }
    async verifyOtpByEmail(email, otp) {
        const vendor = await this.vendorRepository.findOne({ where: { email } });
        if (!vendor) {
            throw new Error('Vendor not found');
        }
        if (vendor.otp !== otp) {
            throw new Error('Invalid OTP');
        }
        return { message: 'OTP verified successfully' };
    }
    create(createVendorDto) {
        const vendor = this.vendorRepository.create(createVendorDto);
        return this.vendorRepository.save(vendor);
    }
    findAll() {
        return this.vendorRepository.find();
    }
    async findByEmail(email) {
        const vendor = await this.vendorRepository.findOne({
            where: { email },
        });
        if (!vendor) {
            throw new Error('Vendor not found');
        }
        return vendor;
    }
    findOne(id) {
        return this.vendorRepository.find({ where: { id } }).then(vendors => vendors[0]);
    }
    update(id, updateVendorDto) {
        return this.vendorRepository.save({ ...updateVendorDto, id });
    }
    remove(id) {
        return this.vendorRepository.delete(id).then(() => undefined);
    }
};
exports.VendorService = VendorService;
exports.VendorService = VendorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vendor_entity_1.VendorEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        mailer_service_1.MailerService,
        jwt_1.JwtService])
], VendorService);
//# sourceMappingURL=vendor.service.js.map