import { Request, Response } from 'express';
import CreateCustomerEventCommandHandler from '@triumph/application/queries/customer-event/add/create-customer-event-handler';
import CustomerEventRepositoryWriter from '@triumph/application/ports/repositories/writer/customer-event-repository-writer';
import CustomerRepositoryReader from '@triumph/application/ports/repositories/reader/customer-repository-reader';
import EventRepositoryReader from '@triumph/application/ports/repositories/reader/event-repository-reader';
import CreateCustomerEventCommand from '@triumph/application/queries/customer-event/add/create-customer-event-command';

export default class CustomerEventController {
  constructor(
    private readonly CustomerEventRepositoryWriter: CustomerEventRepositoryWriter,
    private readonly CustomerRepositoryReader: CustomerRepositoryReader,
    private readonly EventRepositoryReader: EventRepositoryReader
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    const { customerId, eventId, eventDate, description } = req.body;

    const createCustomerEventCommandHandler = new CreateCustomerEventCommandHandler(
      this.CustomerEventRepositoryWriter,
      this.CustomerRepositoryReader,
      this.EventRepositoryReader
    );

    try {
      const customerEvent = await createCustomerEventCommandHandler.execute(
        new CreateCustomerEventCommand(
          customerId,
          eventId,
          eventDate,
          description
        )
      );

      return res.status(201).json(customerEvent);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error creating customer event.' });
    }
  }
}
