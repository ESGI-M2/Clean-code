import CustomerRepositoryReader from '../../../ports/repositories/reader/customer-repository-reader';
import SearchCustomerQuery from './search-customer-query';
import { Customer } from '@triumph/domain/entity/customer';

export default class SearchCustomerQueryHandler {
  constructor(private readonly customerRepositoryReader: CustomerRepositoryReader) {}

  async execute(query: SearchCustomerQuery): Promise<Customer[]> {
    return this.customerRepositoryReader.search(query.keyword);
  }
}
