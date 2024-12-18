import { Event } from '@triumph/domain/entity/event';
import EventModel from '../../models/event.model';
import EventRepositoryReader from '@triumph/application/ports/repositories/reader/event-repository-reader';
import { Op } from 'sequelize';

export default class SequelizeEventRepository implements EventRepositoryReader {
  async list(): Promise<Event[]> {
    const events = await EventModel.findAll();

    return events.map((event) => new Event(event.id, event.name));
  }

  async getById(id: number): Promise<Event> {
    const event = await EventModel.findByPk(id);

    if (!event) {
      throw new Error('Event not found');
    }

    return new Event(event.id, event.name);
  }

  async search(keyword: string): Promise<Event[]> {
    const events = await EventModel.findAll({
      where: {
        name: {
          [Op.iLike]: `%${keyword}%`,
        },
      },
    });

    return events.map((event) => new Event(event.id, event.name));
  }
}
