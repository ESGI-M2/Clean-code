import { CustomerEvent } from '@triumph/domain/entity/customer-event';
import CustomerEventRepositoryWriter from '../../../ports/repositories/writer/customer-event-repository-writer';
import CreateCustomerEventCommand from './create-customer-event-command';
import CustomerRepositoryReader from '../../../ports/repositories/reader/customer-repository-reader';
import EventRepositoryReader from '../../../ports/repositories/reader/event-repository-reader';

export default class CreateCustomerEventCommandHandler {
  constructor(
    private readonly customerEventRepositoryWriter: CustomerEventRepositoryWriter,
    private readonly customerRepositoryReader: CustomerRepositoryReader,
    private readonly eventRepositoryReader: EventRepositoryReader
  ) {}

  async execute(command: CreateCustomerEventCommand): Promise<CustomerEvent> {
    const customer = await this.customerRepositoryReader.getById(command.customerId);
    if (!customer) {
      throw new Error('Customer not found');
    }

    const event = await this.eventRepositoryReader.getById(command.eventId);
    if (!event) {
      throw new Error('Event not found');
    }

    const customerEvent = new CustomerEvent(
      0,
      command.eventDate,
      command.description,
      customer,
      event
    );

    return await this.customerEventRepositoryWriter.add(customerEvent);
  }
}
