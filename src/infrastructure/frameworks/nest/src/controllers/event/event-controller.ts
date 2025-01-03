import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { EventService } from '../../modules/event/event-services';

@Controller('events')
export class EventReaderController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async list(@Res() res: Response): Promise<Response> {
    const events = await this.eventService.listEvents();
    return res.status(200).json(events);
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Res() res: Response): Promise<Response> {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    const event = await this.eventService.getEventById(numericId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    return res.status(200).json(event);
  }

  @Get('search/:keyword')
  async search(@Param('keyword') keyword: string, @Res() res: Response): Promise<Response> {
    const events = await this.eventService.searchEvents(keyword);
    return res.status(200).json(events);
  }
}
