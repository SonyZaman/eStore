import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    create(createCustomerDto: CreateCustomerDto): Promise<import("./customer.entity").CustomerEntity>;
    findAll(): Promise<import("./customer.entity").CustomerEntity[]>;
    update(id: number, updateCustomerDto: CreateCustomerDto): Promise<import("./customer.entity").CustomerEntity>;
    remove(id: number): Promise<void>;
}
