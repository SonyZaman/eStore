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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./product.entity");
const vendor_entity_1 = require("../vendor/vendor.entity");
const category_entity_1 = require("../category/category.entity");
const pusher_service_1 = require("../notifications/pusher.service");
let ProductService = class ProductService {
    productRepository;
    vendorRepository;
    categoryRepository;
    pusherService;
    constructor(productRepository, vendorRepository, categoryRepository, pusherService) {
        this.productRepository = productRepository;
        this.vendorRepository = vendorRepository;
        this.categoryRepository = categoryRepository;
        this.pusherService = pusherService;
    }
    async createProduct(dto) {
        const product = new product_entity_1.ProductEntity();
        product.title = dto.title;
        product.description = dto.description;
        product.price = dto.price;
        product.productType = dto.productType;
        product.imageUrl = dto.imageUrl || '';
        const vendor = await this.vendorRepository.findOne({ where: { id: dto.vendorId } });
        if (!vendor)
            throw new Error('Vendor not found');
        product.vendor = vendor;
        const savedProduct = await this.productRepository.save(product);
        const category = await this.categoryRepository.findOne({ where: { id: dto.categoryId } });
        if (!category)
            throw new Error('Category not found');
        product.category = category;
        this.pusherService.sendProductNotification('product-created', `${savedProduct.title} was created by ${vendor.name}`, savedProduct);
        return savedProduct;
    }
    findAll() {
        return this.productRepository.find();
    }
    async getProductById(productId) {
        const product = await this.productRepository.findOne({
            where: { id: productId },
        });
        if (!product) {
            throw new Error(`Product with ID ${productId} not found`);
        }
        return product;
    }
    async remove(id) {
        const product = await this.productRepository.findOne({ where: { id }, relations: ['vendor'] });
        if (!product) {
            throw new Error('Product not found');
        }
        await this.pusherService.sendProductNotification('product-deleted', `${product.title} was deleted by ${product.vendor.name}`, product);
        await this.productRepository.delete(id);
    }
    async updateProductById(id, updateProductDto) {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product)
            throw new Error('Product not found');
        product.title = updateProductDto.title || product.title;
        product.description = updateProductDto.description || product.description;
        product.price = updateProductDto.price || product.price;
        product.productType = updateProductDto.productType || product.productType;
        product.imageUrl = updateProductDto.imageUrl || product.imageUrl;
        if (updateProductDto.vendorId) {
            const vendor = await this.vendorRepository.findOne({ where: { id: updateProductDto.vendorId } });
            if (vendor)
                product.vendor = vendor;
        }
        if (updateProductDto.categoryId) {
            const category = await this.categoryRepository.findOne({ where: { id: updateProductDto.categoryId } });
            if (category)
                product.category = category;
        }
        const updatedProduct = await this.productRepository.save(product);
        this.pusherService.sendProductNotification('product-updated', `${updatedProduct.title} was updated by ${product.vendor.name}`, updatedProduct);
        return updatedProduct;
    }
    async findByVendor(vendorId) {
        return this.productRepository.find({
            where: { vendor: { id: vendorId } },
            relations: ['vendor'],
        });
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(vendor_entity_1.VendorEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(category_entity_1.CategoryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        pusher_service_1.PusherService])
], ProductService);
//# sourceMappingURL=product.service.js.map