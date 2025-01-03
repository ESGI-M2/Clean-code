import { Injectable, Inject } from '@nestjs/common';
import { CustomerEvent } from '@triumph/domain/entity/customer-event';
import CustomerEventRepositoryWriter from '@triumph/application/ports/repositories/writer/customer-event-repository-writer';
import CustomerEventRepositoryReader from '@triumph/application/ports/repositories/reader/customer-event-repository-reader';
import CustomerRepositoryReader from '@triumph/application/ports/repositories/reader/customer-repository-reader';
import EventRepositoryReader from '@triumph/application/ports/repositories/reader/event-repository-reader';
import CreateCustomerEventCommandHandler from '@triumph/application/queries/customer-event/add/create-customer-event-handler';
import CreateCustomerEventCommand from '@triumph/application/queries/customer-event/add/create-customer-event-command';

@Injectable()
export class CustomerEventService {
  constructor(
    @Inject('CustomerEventRepositoryWriter') private readonly customerEventRepositoryWriter: CustomerEventRepositoryWriter,
    @Inject('CustomerEventRepositoryReader') private readonly customerEventRepositoryReader: CustomerEventRepositoryReader,
    @Inject('CustomerRepositoryReader') private readonly customerRepositoryReader: CustomerRepositoryReader,
    @Inject('EventRepositoryReader') private readonly eventRepositoryReader: EventRepositoryReader,
  ) {}

  async createCustomerEvent(customerId: number, eventId: number, eventDate: Date, description: string): Promise<CustomerEvent> {
    const createHandler = new CreateCustomerEventCommandHandler(
      this.customerEventRepositoryWriter,
      this.customerRepositoryReader,
      this.eventRepositoryReader,
    );

    const command = new CreateCustomerEventCommand(customerId, eventId, eventDate, description);
    return await createHandler.execute(command);
  }

  async getCustomerEventList(): Promise<CustomerEvent[]> {
    return await this.customerEventRepositoryReader.list();
  }

  async getCustomerEventById(id: number): Promise<CustomerEvent | null> {
    return await this.customerEventRepositoryReader.getById(id);
  }

  async getEventsByCustomerId(customerId: number): Promise<CustomerEvent[]> {
    return await this.customerEventRepositoryReader.getByCustomerId(customerId);
  }

  async searchCustomerEvent(keyword: string): Promise<CustomerEvent[]> {
    return await this.customerEventRepositoryReader.search(keyword);
  }
}
