import { Injectable, Inject } from '@nestjs/common';
import { Customer } from '@triumph/domain/entity/customer';
import CustomerRepositoryWriter from '@triumph/application/ports/repositories/writer/customer-repository-writer';

@Injectable()
export default class CustomerService {
  constructor(
    @Inject('CustomerRepositoryWriter')
    private readonly customerRepositoryWriter: CustomerRepositoryWriter,
  ) {}

  async createCustomer(customer: Customer): Promise<Customer> {
    return await this.customerRepositoryWriter.add(customer);
  }
}
