import { CustomerEvent } from '@triumph/domain/entity/customer-event';

export default interface CustomerEventRepositoryWriter {
  add(customerEvent: CustomerEvent): Promise<CustomerEvent>;
}
