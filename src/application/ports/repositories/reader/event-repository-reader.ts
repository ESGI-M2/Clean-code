import { Event } from '@triumph/domain/entity/event';

export default abstract class EventRepositoryReader {
  abstract list(): Promise<Event[]>;
  abstract getById(eventId: number): Promise<Event>;
  abstract search(keyword: string): Promise<Event[]>;
}
