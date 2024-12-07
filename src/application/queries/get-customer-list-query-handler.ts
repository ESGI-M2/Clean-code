import { Customer } from '../../domain/entity/customer';
import CustomerRepositoryReader from '../ports/repositories/customer-repository-reader';
import GetCustomerListQuery from './get-customer-list-query';

export default class GetAllCustomersQueryHandler {
  constructor(private readonly CustomerRepositoryReader: CustomerRepositoryReader) {}

  execute(query: GetCustomerListQuery): Customer[] {
    return this.CustomerRepositoryReader.list();
  }
}
