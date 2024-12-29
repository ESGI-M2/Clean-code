import { CustomerEvent } from '@triumph/domain/entity/customer-event';
import CustomerEventModel from '../../models/customer-event.model';
import CustomerModel from '../../models/customer.model';
import EventModel from '../../models/event.model';
import { toDomainCustomer } from '../../../../../adapters/customer-adapter';
import { Event as EventDomain } from '@triumph/domain/entity/event';
import CustomerEventRepositoryWriter from '@triumph/application/ports/repositories/writer/customer-event-repository-writer';

export default class SequelizeCustomerEventRepositoryWriter implements CustomerEventRepositoryWriter {
  async add(customerEvent: CustomerEvent): Promise<CustomerEvent> {
    if (!customerEvent.customer) {
      throw new Error('Customer is required to create a customer event');
    }

    if (!customerEvent.event) {
      throw new Error('Event is required to create a customer event');
    }

    const customerModel = await CustomerModel.findByPk(customerEvent.customer.id);
    if (!customerModel) {
      throw new Error('Customer not found');
    }

    const customer = toDomainCustomer(customerModel);

    const eventModel = await EventModel.findByPk(customerEvent.event.id);
    if (!eventModel) {
      throw new Error('Event not found');
    }

    const eventModelData = await EventModel.findByPk(customerEvent.event.id);
    if (!eventModelData) {
      throw new Error('EventModelData not found');
    }

    const event = new EventDomain(
      eventModelData.id,
      eventModelData.name,
    );

    const customerEventData = await CustomerEventModel.create({
      customerId: customer.id,
      eventId: event.id,
      eventDate: customerEvent.eventDate,
      description: customerEvent.description
    });

    return new CustomerEvent(
      customerEventData.id,
      customerEventData.eventDate,
      customerEventData.description,
      customer,
      event
    );
  }
}
