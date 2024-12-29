import { Customer } from '@triumph/domain/entity/customer';

export default interface CustomerRepositoryWriter {
  add(customer: Customer): Promise<Customer>;
}
