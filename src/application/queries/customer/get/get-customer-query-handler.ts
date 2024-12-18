import { Customer } from '@triumph/domain/entity/customer';
import CustomerRepositoryReader from '../../../ports/repositories/reader/customer-repository-reader';
import GetCustomerQuery from './get-customer-query';

export default class GetCustomerQueryHandler {
  constructor(private readonly customerRepositoryReader: CustomerRepositoryReader) {}

  async execute(query: GetCustomerQuery): Promise<Customer | null> {
    return this.customerRepositoryReader.getById(query.id);
  }
}
