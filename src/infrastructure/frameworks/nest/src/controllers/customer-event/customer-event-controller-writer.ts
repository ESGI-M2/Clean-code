import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import CreateCustomerEventCommandHandler from '@triumph/application/queries/customer-event/add/create-customer-event-handler';
import SequelizeCustomerEventRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/customer-event/customer-event-repository-writer';
import SequelizeCustomerRepositoryReader from '@triumph/sequelize-adapter/src/repositories/customer/customer-repository-reader';
import SequelizeEventRepositoryReader from '@triumph/sequelize-adapter/src/repositories/event/event-repository-reader';
import CreateCustomerEventCommand from '@triumph/application/queries/customer-event/add/create-customer-event-command';

@Controller('customerevents')
export class CustomerEventWriterController {
  private customerEventRepositoryWriter: SequelizeCustomerEventRepositoryWriter;
  private customerRepositoryReader: SequelizeCustomerRepositoryReader;
  private eventRepositoryReader: SequelizeEventRepositoryReader;

  constructor() {
    this.customerEventRepositoryWriter = new SequelizeCustomerEventRepositoryWriter();
    this.customerRepositoryReader = new SequelizeCustomerRepositoryReader();
    this.eventRepositoryReader = new SequelizeEventRepositoryReader();
  }

  @Post()
  async create(@Body() body: any, @Res() res: Response): Promise<Response> {
    const { customerId, eventId, eventDate, description } = body;
    const createHandler = new CreateCustomerEventCommandHandler(
      this.customerEventRepositoryWriter,
      this.customerRepositoryReader,
      this.eventRepositoryReader,
    );
    try {
      const customerEvent = await createHandler.execute(
        new CreateCustomerEventCommand(customerId, eventId, eventDate, description),
      );
      return res.status(201).json(customerEvent);
    } catch (error) {
      return res.status(500).json({ message: 'Error creating customer event.', error });
    }
  }
}
