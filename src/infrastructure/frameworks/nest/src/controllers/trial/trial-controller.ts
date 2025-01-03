import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { TrialService } from '../../modules/trial/trial-services';

@Controller('trials')
export class TrialController {
  constructor(private readonly trialService: TrialService) {}

  @Get()
  async list(@Res() res: Response): Promise<Response> {
    try {
      const trials = await this.trialService.listTrials();
      return res.status(200).json(trials);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur lors de la récupération des essais.' });
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Res() res: Response): Promise<Response> {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    try {
      const trial = await this.trialService.getTrialById(numericId);
      if (!trial) {
        return res.status(404).json({ message: 'Essai non trouvé' });
      }
      return res.status(200).json(trial);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur lors de la récupération de l\'essai.' });
    }
  }

  @Get('search/:keyword')
  async search(@Param('keyword') keyword: string, @Res() res: Response): Promise<Response> {
    try {
      const trials = await this.trialService.searchTrials(keyword);
      return res.status(200).json(trials);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur lors de la recherche des essais.' });
    }
  }
}
