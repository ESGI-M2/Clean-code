import EventRepositoryReader from '../../../ports/repositories/reader/event-repository-reader';
import GetEventListQuery from './get-event-list-query';
import { Event } from '@triumph/domain/entity/event';

export default class GetEventListQueryHandler {
  constructor(private readonly eventRepositoryReader: EventRepositoryReader) {}

  async execute(query: GetEventListQuery): Promise<Event[]> {
    return await this.eventRepositoryReader.list();
  }
}
