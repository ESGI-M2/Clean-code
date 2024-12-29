import { Request, Response } from 'express';
import GetCustomerEventListQueryHandler from '@triumph/application/queries/customer-event/get/get-customer-event-list-query-handler';
import GetCustomerEventListQuery from '@triumph/application/queries/customer-event/get/get-customer-event-list-query';
import GetCustomerEventQueryHandler from '@triumph/application/queries/customer-event/get/get-customer-event-query-handler';
import SearchCustomerEventQueryHandler from '@triumph/application/queries/customer-event/filter/search-customer-event-query-handler';
import GetCustomerEventQuery from '@triumph/application/queries/customer-event/get/get-customer-event-query';
import SearchCustomerEventQuery from '@triumph/application/queries/customer-event/filter/search-customer-event-query';
import CustomerEventRepositoryReader from '@triumph/application/ports/repositories/reader/customer-event-repository-reader';

export default class CustomerEventController {
  constructor(
    private readonly CustomerEventRepositoryReader: CustomerEventRepositoryReader,
  ) {}

  async list(req: Request, res: Response): Promise<Response> {
    const listCustomerEventUsecase = new GetCustomerEventListQueryHandler(this.CustomerEventRepositoryReader);
    const customerEvents = await listCustomerEventUsecase.execute(new GetCustomerEventListQuery());
    return res.status(200).json(customerEvents);
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    const getCustomerEventUsecase = new GetCustomerEventQueryHandler(this.CustomerEventRepositoryReader);
    const customerEvent = await getCustomerEventUsecase.execute(new GetCustomerEventQuery(numericId));

    if (!customerEvent) {
      return res.status(404).json({ message: 'CustomerEvent not found' });
    }

    return res.status(200).json(customerEvent);
  }

  async getByCustomerId(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    const customerEvents = await this.CustomerEventRepositoryReader.getByCustomerId(numericId);
    
    if (!customerEvents || customerEvents.length === 0) {
      return res.status(404).json({ message: 'No events found for this customer' });
    }

    return res.status(200).json(customerEvents);
  }

  async search(req: Request, res: Response): Promise<Response> {
    const { keyword } = req.params;

    const searchCustomerEventUsecase = new SearchCustomerEventQueryHandler(this.CustomerEventRepositoryReader);
    const customerEvents = await searchCustomerEventUsecase.execute(new SearchCustomerEventQuery(keyword));

    return res.status(200).json(customerEvents);
  }
}
