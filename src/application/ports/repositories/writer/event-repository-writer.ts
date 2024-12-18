import { Event } from '@triumph/domain/entity/event';

export default abstract class EventRepositoryWriter {
  abstract add(eventModel: Event): Promise<Event>;
}
