import { Repository } from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
export declare class CustomerService {
    private customerRepository;
    constructor(customerRepository: Repository<CustomerEntity>);
    createCustomer(dto: CreateCustomerDto): Promise<CustomerEntity>;
    findAll(): Promise<CustomerEntity[]>;
}
