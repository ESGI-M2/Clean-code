import { Event } from '@triumph/domain/entity/event';
import EventRepositoryReader from '../../../ports/repositories/reader/event-repository-reader';
import GetEventQuery from './get-event-query';

export default class GetEventQueryHandler {
  constructor(private readonly eventRepository: EventRepositoryReader) {}

  async execute(query: GetEventQuery): Promise<Event> {
    return this.eventRepository.getById(query.id);
  }
}
