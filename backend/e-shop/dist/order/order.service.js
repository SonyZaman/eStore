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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./order.entity");
const order_item_service_1 = require("../order-item/order-item.service");
const customer_entity_1 = require("../customer/customer.entity");
const product_entity_1 = require("../product/product.entity");
let OrderService = class OrderService {
    orderRepository;
    orderItemService;
    customerRepository;
    productRepository;
    constructor(orderRepository, orderItemService, customerRepository, productRepository) {
        this.orderRepository = orderRepository;
        this.orderItemService = orderItemService;
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
    }
    async create(dto) {
        const customer = await this.customerRepository.findOne({ where: { id: dto.customerId } });
        if (!customer)
            throw new Error('Customer not found');
        const order = new order_entity_1.OrderEntity();
        order.customer = customer;
        order.status = dto.status || 'pending';
        order.totalPrice = 0;
        const savedOrder = await this.orderRepository.save(order);
        let total = 0;
        if (!Array.isArray(dto.orderItems))
            throw new Error('dto.orderItems must be an array');
        for (const itemDto of dto.orderItems) {
            const product = await this.productRepository.findOne({ where: { id: itemDto.productId } });
            if (!product)
                throw new Error(`Product with id ${itemDto.productId} not found`);
            const orderItem = await this.orderItemService.create({
                orderId: savedOrder.id,
                productId: product.id,
                quantity: itemDto.quantity,
            });
            total += product.price * itemDto.quantity;
        }
        savedOrder.totalPrice = total;
        return this.orderRepository.save(savedOrder);
    }
    async findAll() {
        return this.orderRepository.find({ relations: ['customer', 'orderItems'] });
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.OrderEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(customer_entity_1.CustomerEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        order_item_service_1.OrderItemService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrderService);
//# sourceMappingURL=order.service.js.map