import { Customer } from '@triumph/domain/entity/customer';

export default abstract class CustomerRepositoryReader {
  abstract list(): Promise<Customer[]>;
    abstract getById(customerId: number): Promise<Customer | null>;
  abstract search(keyword: string): Promise<Customer[]>;
}
