import CustomerRepositoryReader from '@triumph/application/ports/repositories/reader/customer-repository-reader';
import { Customer } from '@triumph/domain/entity/customer';
import { DrivingLicense } from '@triumph/domain/entity/driving-license';
import { Occupation } from '@triumph/domain/entity/occupation';

/**
 * @deprecated
 *
 * InMemoryCustomerRepository is an implementation of the CustomerRepositoryReader
 *
 * This class is just used for testing purposes
 */
export default class InMemoryCustomerRepository implements CustomerRepositoryReader {
  private customers: Customer[] = [];

  constructor() {
    const mockCustomer1 = new Customer(
      1,
      new DrivingLicense(1, new Date(), 'VALID', 'US'),
      new Occupation(1, 'Software Engineer'),
      'Doe',
      'John',
      'john@email.com',
      '123 Main St',
    );

    const mockCustomer2 = new Customer(
      2,
      new DrivingLicense(2, new Date(), 'EXPIRED', 'CA'),
      new Occupation(2, 'Doctor'),
      'Doe',
      'Jane',
      'jane@email.com',
      '123 Main St',
    );

    this.customers.push(mockCustomer1);
    this.customers.push(mockCustomer2);
  }

  list(): Customer[] {
    return this.customers;
  }

  getById(id: number): Customer | null {
    const customer = this.customers.find(cust => cust.id === id);
    return customer || null;
  }

  search(keyword: string): Customer[] {
    const lowercasedKeyword = keyword.toLowerCase();
    return this.customers.filter(customer => 
      customer.firstName.toLowerCase().includes(lowercasedKeyword) ||
      customer.lastName.toLowerCase().includes(lowercasedKeyword) ||
      customer.email.toLowerCase().includes(lowercasedKeyword)
    );
  }
}
