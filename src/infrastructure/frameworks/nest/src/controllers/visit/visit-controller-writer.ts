import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { VisitService } from '../../modules/visit/visit-services';

@Controller('visits')
export class VisitControllerWriter {
  constructor(private readonly visitService: VisitService) {}

  @Post()
  async create(@Body() body: { bikeId: number, date: Date, price: number , recapitulation: string}, @Res() res: Response): Promise<Response> {
    const { bikeId, date, price, recapitulation } = body;
    try {
      const visit = await this.visitService.createVisit(bikeId, date, price, recapitulation);
      return res.status(201).json(visit);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur lors de la création de la visite.' });
    }
  }
}
