import { Request, Response } from 'express';
import CreateEventCommandHandler from '@triumph/application/queries/event/add/create-event-handler';
import EventRepositoryWriter from '@triumph/application/ports/repositories/writer/event-repository-writer';
import CreateEventCommand from '@triumph/application/queries/event/add/create-event-command';

export default class EventControllerWriter {
  constructor(private readonly EventRepositoryWriter: EventRepositoryWriter) {}

  async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    const createEventUsecase = new CreateEventCommandHandler(this.EventRepositoryWriter);
    const event = await createEventUsecase.execute(new CreateEventCommand(name));

    return Promise.resolve(res.status(201).json(event));
  }
}
