import { Request, Response } from 'express';
import GetEventListQuery from '@triumph/application/queries/event/get/get-event-list-query';
import EventRepositoryReader from '@triumph/application/ports/repositories/reader/event-repository-reader';
import GetEventListQueryHandler from '@triumph/application/queries/event/get/get-event-list-query-handler';
import GetEventQuery from '@triumph/application/queries/event/get/get-event-query';
import GetEventQueryHandler from '@triumph/application/queries/event/get/get-event-query-handler';
import SearchEventQueryHandler from '@triumph/application/queries/event/filter/search-event-query-handler';
import SearchEventQuery from '@triumph/application/queries/event/filter/search-event-query';

export default class EventController {
  constructor(private readonly EventRepositoryReader: EventRepositoryReader) {}

  async list(req: Request, res: Response): Promise<Response> {
    const listEventUsecase = new GetEventListQueryHandler(this.EventRepositoryReader);
    const events = await listEventUsecase.execute(new GetEventListQuery());
    return res.status(200).json(events);
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    const getEventUsecase = new GetEventQueryHandler(this.EventRepositoryReader);
    const event = await getEventUsecase.execute(new GetEventQuery(numericId));

    return res.status(200).json(event);
  }

  async search(req: Request, res: Response): Promise<Response> {
    const { keyword } = req.params;
    const searchEventUsecase = new SearchEventQueryHandler(this.EventRepositoryReader);
    const events = await searchEventUsecase.execute(new SearchEventQuery(keyword));

    return res.status(200).json(events);
  }
}
