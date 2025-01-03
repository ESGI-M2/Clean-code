import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { EventService } from '../../modules/event/event-services';

@Controller('events')
export class EventWriterController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async create(@Body() body: { name: string }, @Res() res: Response): Promise<Response> {
    const { name } = body;

    try {
      const event = await this.eventService.createEvent({ name });
      return res.status(201).json(event);
    } catch (error) {
      return res.status(500).json({ message: 'Erreur lors de la création de l\'événement', error });
    }
  }
}
