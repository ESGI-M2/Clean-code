import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import GetCustomerEventListQueryHandler from '@triumph/application/queries/customer-event/get/get-customer-event-list-query-handler';
import GetCustomerEventListQuery from '@triumph/application/queries/customer-event/get/get-customer-event-list-query';
import GetCustomerEventQueryHandler from '@triumph/application/queries/customer-event/get/get-customer-event-query-handler';
import GetCustomerEventQuery from '@triumph/application/queries/customer-event/get/get-customer-event-query';
import SearchCustomerEventQueryHandler from '@triumph/application/queries/customer-event/filter/search-customer-event-query-handler';
import SearchCustomerEventQuery from '@triumph/application/queries/customer-event/filter/search-customer-event-query';
import SequelizeCustomerEventRepositoryReader from '@triumph/sequelize-adapter/src/repositories/customer-event/customer-event-repository-reader';

@Controller('customerevents')
export class CustomerEventReaderController {
  private customerEventRepositoryReader: SequelizeCustomerEventRepositoryReader;
  private getCustomerEventListQueryHandler: GetCustomerEventListQueryHandler;
  private getCustomerEventQueryHandler: GetCustomerEventQueryHandler;
  private searchCustomerEventQueryHandler: SearchCustomerEventQueryHandler;

  constructor() {
    this.customerEventRepositoryReader = new SequelizeCustomerEventRepositoryReader();
    this.getCustomerEventListQueryHandler = new GetCustomerEventListQueryHandler(this.customerEventRepositoryReader);
    this.getCustomerEventQueryHandler = new GetCustomerEventQueryHandler(this.customerEventRepositoryReader);
    this.searchCustomerEventQueryHandler = new SearchCustomerEventQueryHandler(this.customerEventRepositoryReader);
  }

  @Get()
  async list(@Res() res: Response): Promise<Response> {
    const customerEvents = await this.getCustomerEventListQueryHandler.execute(new GetCustomerEventListQuery());
    return res.status(200).json(customerEvents);
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Res() res: Response): Promise<Response> {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }
    const customerEvent = await this.getCustomerEventQueryHandler.execute(new GetCustomerEventQuery(numericId));
    if (!customerEvent) {
      return res.status(404).json({ message: 'CustomerEvent not found' });
    }
    return res.status(200).json(customerEvent);
  }

  @Get('search/:keyword')
  async search(@Param('keyword') keyword: string, @Res() res: Response): Promise<Response> {
    const customerEvents = await this.searchCustomerEventQueryHandler.execute(new SearchCustomerEventQuery(keyword));
    return res.status(200).json(customerEvents);
  }
}
