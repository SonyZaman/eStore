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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const vendor_service_1 = require("../vendor/vendor.service");
let AuthService = class AuthService {
    vendorService;
    jwtService;
    constructor(vendorService, jwtService) {
        this.vendorService = vendorService;
        this.jwtService = jwtService;
    }
    async validateUser(loginDto) {
        const vendor = await this.vendorService.findByEmail(loginDto.email);
        if (!vendor) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (loginDto.password !== vendor.password) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return vendor;
    }
    async signIn(loginDto) {
        try {
            const vendor = await this.validateUser(loginDto);
            const payload = { email: vendor.email, sub: vendor.id };
            const access_token = await this.jwtService.signAsync(payload);
            return { access_token };
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Login failed');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [vendor_service_1.VendorService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map