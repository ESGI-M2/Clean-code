import { Inject, Injectable } from '@nestjs/common';
import EventRepositoryReader from '@triumph/application/ports/repositories/reader/event-repository-reader';
import EventRepositoryWriter from '@triumph/application/ports/repositories/writer/event-repository-writer';
import CreateEventCommand from '@triumph/application/queries/event/add/create-event-command';
import { Event } from '@triumph/domain/entity/event';

@Injectable()
export class EventService {
  constructor(
    @Inject('EventRepositoryWriter') private readonly eventRepositoryWriter: EventRepositoryWriter,
    @Inject('EventRepositoryReader') private readonly eventRepositoryReader: EventRepositoryReader,
  ) {}

  async createEvent({ name }: { name: string }): Promise<Event> {
    const createEventCommand = new CreateEventCommand(name);
    return this.eventRepositoryWriter.add(new Event(0, name));
  }

  async listEvents(): Promise<Event[]> {
    return this.eventRepositoryReader.list();
  }

  async getEventById(id: number): Promise<Event | null> {
    return this.eventRepositoryReader.getById(id);
  }

  async searchEvents(keyword: string): Promise<Event[]> {
    return this.eventRepositoryReader.search(keyword);
  }
}
