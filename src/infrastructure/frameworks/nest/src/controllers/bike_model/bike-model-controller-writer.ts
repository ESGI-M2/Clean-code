import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { BikeModelService } from '../../modules/bike_model/bike-model-services';

@Controller('bikemodels')
export class BikeModelControllerWriter {
  constructor(private readonly bikeModelService: BikeModelService) {}

  @Post()
  async create(@Body() body: { name: string }, @Res() res: Response): Promise<Response> {
    const { name } = body;

    try {
      const bikeModel = await this.bikeModelService.create(name);
      return res.status(201).json(bikeModel);
    } catch (error) {
      return res.status(500).json({ message: 'Erreur lors de la création du modèle de vélo', error });
    }
  }
}
