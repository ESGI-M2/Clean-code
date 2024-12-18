import { Controller, Get } from '@nestjs/common';

import GetCustomerListQueryHandler from '@triumph/application/queries/customer/get/get-customer-list-query-handler';
import GetCustomerListQuery from '@triumph/application/queries/customer/get/get-customer-list-query';
import { Customer } from '@triumph/domain/entity/customer';
import CustomerRepositoryReader from '@triumph/application/ports/repositories/reader/customer-repository-reader';

@Controller('customers')
export default class CustomerController {
  constructor(private readonly customerRepositoryReader: CustomerRepositoryReader) {}

  @Get()
  all(): Customer[] {
    const getCustomerListUsecase = new GetCustomerListQueryHandler(this.customerRepositoryReader);
    const customers = getCustomerListUsecase.execute(new GetCustomerListQuery());

    return customers;
  }
}
