import { Event } from '@triumph/domain/entity/event';
import EventRepositoryWriter from '../../../ports/repositories/writer/event-repository-writer';
import CreateEventCommand from './create-event-command';

export default class CreateEventCommandHandler {
  constructor(
    private readonly eventRepositoryWriter: EventRepositoryWriter
  ) {}

  async execute(command: CreateEventCommand): Promise<Event> {
    const event = new Event(0, command.name);
    return await this.eventRepositoryWriter.add(event);
  }
}
