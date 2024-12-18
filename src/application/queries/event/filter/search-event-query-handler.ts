import { Event } from '@triumph/domain/entity/event';
import EventRepositoryReader from '../../../ports/repositories/reader/event-repository-reader';
import SearchEventQuery from './search-event-query';

export default class SearchEventQueryHandler {
  constructor(private readonly eventRepository: EventRepositoryReader) {}

  async execute(query: SearchEventQuery): Promise<Event[]> {
    return this.eventRepository.search(query.keyword);
  }
}
