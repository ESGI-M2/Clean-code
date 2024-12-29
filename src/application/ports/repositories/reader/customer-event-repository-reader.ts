import { CustomerEvent } from '@triumph/domain/entity/customer-event';

export default abstract class CustomerRepositoryReader {
  abstract list(): Promise<CustomerEvent[]>;
  abstract getByCustomerId(customerId: number): Promise<CustomerEvent[]>;
  abstract getById(customerEventId: number): Promise<CustomerEvent | null>;
  abstract search(keyword: string): Promise<CustomerEvent[]>;
}
