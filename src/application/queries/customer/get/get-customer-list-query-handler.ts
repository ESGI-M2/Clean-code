import CustomerRepositoryReader from '../../../ports/repositories/reader/customer-repository-reader';
import GetCustomerListQuery from './get-customer-list-query';
import { Customer } from '@triumph/domain/entity/customer';

export default class GetCustomerListQueryHandler {
  constructor(private readonly customerRepositoryReader: CustomerRepositoryReader) {}

  async execute(query: GetCustomerListQuery): Promise<Customer[]> {
    return await this.customerRepositoryReader.list();
  }
}
