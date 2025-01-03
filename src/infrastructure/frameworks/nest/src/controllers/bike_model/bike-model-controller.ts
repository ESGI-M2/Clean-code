import { Controller, Get, Param, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { BikeModelService } from '../../modules/bike_model/bike-model-services';

@Controller('bikemodels')
export class BikeModelController {
  constructor(private readonly bikeModelService: BikeModelService) {}

  @Get()
  async list(@Res() res: Response): Promise<Response> {
    try {
      const bikeModels = await this.bikeModelService.getList();
      return res.status(200).json(bikeModels);
    } catch (error) {
      return res.status(500).json({ message: 'Erreur serveur', error });
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Res() res: Response): Promise<Response> {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    try {
      const bikeModel = await this.bikeModelService.getById(numericId);
      if (!bikeModel) {
        return res.status(404).json({ message: 'Modèle de vélo non trouvé' });
      }
      return res.status(200).json(bikeModel);
    } catch (error) {
      return res.status(500).json({ message: 'Erreur serveur', error });
    }
  }

  @Get('search/:keyword')
  async search(@Param('keyword') keyword: string, @Res() res: Response): Promise<Response> {
    try {
      const bikeModels = await this.bikeModelService.search(keyword);
      return res.status(200).json(bikeModels);
    } catch (error) {
      return res.status(500).json({ message: 'Erreur serveur', error });
    }
  }
}
