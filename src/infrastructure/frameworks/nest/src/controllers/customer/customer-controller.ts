import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import GetCustomerListQueryHandler from '@triumph/application/queries/customer/get/get-customer-list-query-handler';
import GetCustomerListQuery from '@triumph/application/queries/customer/get/get-customer-list-query';
import GetCustomerQueryHandler from '@triumph/application/queries/customer/get/get-customer-query-handler';
import GetCustomerQuery from '@triumph/application/queries/customer/get/get-customer-query';
import SearchCustomerQueryHandler from '@triumph/application/queries/customer/filter/search-customer-query-handler';
import SearchCustomerQuery from '@triumph/application/queries/customer/filter/search-customer-query';
import SequelizeCustomerRepositoryReader from '@triumph/sequelize-adapter/src/repositories/customer/customer-repository-reader';

@Controller('customers')
export class CustomerReaderController {
  private customerRepositoryReader: SequelizeCustomerRepositoryReader;
  private getCustomerListQueryHandler: GetCustomerListQueryHandler;
  private getCustomerQueryHandler: GetCustomerQueryHandler;
  private searchCustomerQueryHandler: SearchCustomerQueryHandler;

  constructor() {
    this.customerRepositoryReader = new SequelizeCustomerRepositoryReader();
    this.getCustomerListQueryHandler = new GetCustomerListQueryHandler(this.customerRepositoryReader);
    this.getCustomerQueryHandler = new GetCustomerQueryHandler(this.customerRepositoryReader);
    this.searchCustomerQueryHandler = new SearchCustomerQueryHandler(this.customerRepositoryReader);
  }

  @Get()
  async list(@Res() res: Response): Promise<Response> {
    try {
      const customers = await this.getCustomerListQueryHandler.execute(new GetCustomerListQuery());
      return res.status(200).json(customers);
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Res() res: Response): Promise<Response> {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    try {
      const customer = await this.getCustomerQueryHandler.execute(new GetCustomerQuery(numericId));
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      return res.status(200).json(customer);
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  }

  @Get('search/:keyword')
  async search(@Param('keyword') keyword: string, @Res() res: Response): Promise<Response> {
    try {
      const customers = await this.searchCustomerQueryHandler.execute(new SearchCustomerQuery(keyword));
      return res.status(200).json(customers);
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  }
}
