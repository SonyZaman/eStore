import { Repository } from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
export declare class CustomerService {
    private customerRepository;
    constructor(customerRepository: Repository<CustomerEntity>);
    create(createCustomerDto: CreateCustomerDto): Promise<CustomerEntity>;
    findAll(): Promise<CustomerEntity[]>;
    update(id: number, updateCustomerDto: CreateCustomerDto): Promise<CustomerEntity>;
    remove(id: number): Promise<void>;
}
