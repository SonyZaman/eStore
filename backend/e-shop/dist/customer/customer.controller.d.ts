import { CustomerService } from './customer.service';
import { CustomerEntity } from './customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    register(dto: CreateCustomerDto): Promise<CustomerEntity>;
    findAll(): Promise<CustomerEntity[]>;
}
