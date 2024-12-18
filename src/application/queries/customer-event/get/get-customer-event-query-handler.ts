import { CustomerEvent } from '@triumph/domain/entity/customer-event';
import CustomerEventRepositoryReader from '../../../ports/repositories/reader/customer-event-repository-reader';
import GetCustomerEventQuery from './get-customer-event-query';

export default class GetCustomerEventQueryHandler {
  constructor(private readonly customerEventRepositoryReader: CustomerEventRepositoryReader) {}

  async execute(query: GetCustomerEventQuery): Promise<CustomerEvent | null> {
    return this.customerEventRepositoryReader.getById(query.id);
  }
}
