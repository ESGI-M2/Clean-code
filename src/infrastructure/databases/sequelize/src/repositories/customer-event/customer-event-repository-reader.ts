import { Op } from 'sequelize';
import { CustomerEvent } from '@triumph/domain/entity/customer-event';
import CustomerEventModel from '../../models/customer-event.model';
import CustomerModel from '../../models/customer.model';
import EventModel from '../../models/event.model';
import CustomerEventRepositoryReader from '@triumph/application/ports/repositories/reader/customer-event-repository-reader';
import { toDomainCustomer } from '../../../../../adapters/customer-adapter';
import { Event as DomainEvent } from '@triumph/domain/entity/event';

export default class SequelizeCustomerEventRepositoryReader implements CustomerEventRepositoryReader {

  async list(): Promise<CustomerEvent[]> {
    const customerEvents = await CustomerEventModel.findAll({
      include: [
        {
          model: CustomerModel,
          as: 'customer',
        },
        {
          model: EventModel,
          as: 'event',
        }
      ]
    });

    return customerEvents.map(customerEvent => 
      new CustomerEvent(
        customerEvent.id,
        customerEvent.eventDate,
        customerEvent.description,
        toDomainCustomer(customerEvent.customer),
        this.mapEvent(customerEvent.event)
      )
    );
  }

  // Récupérer un événement par ID
  async getById(customerEventId: number): Promise<CustomerEvent | null> {
    const customerEvent = await CustomerEventModel.findByPk(customerEventId, {
      include: [
        { model: CustomerModel, as: 'customer' },
        { model: EventModel, as: 'event' }
      ]
    });

    if (!customerEvent) return null;

    return new CustomerEvent(
      customerEvent.id,
      customerEvent.eventDate,
      customerEvent.description,
      toDomainCustomer(customerEvent.customer),
      this.mapEvent(customerEvent.event)
    );
  }

  async search(keyword: string): Promise<CustomerEvent[]> {
    const customerEvents = await CustomerEventModel.findAll({
      where: {
        description: {
          [Op.iLike]: `%${keyword}%`
        }
      },
      include: [
        { model: CustomerModel, as: 'customer' },
        { model: EventModel, as: 'event' }
      ]
    });

    return customerEvents.map(customerEvent => 
      new CustomerEvent(
        customerEvent.id,
        customerEvent.eventDate,
        customerEvent.description,
        toDomainCustomer(customerEvent.customer),
        this.mapEvent(customerEvent.event)
      )
    );
  }

  private mapEvent(event: EventModel): DomainEvent {
    return new DomainEvent(
      event.id,
      event.name,
    );
  }
}
