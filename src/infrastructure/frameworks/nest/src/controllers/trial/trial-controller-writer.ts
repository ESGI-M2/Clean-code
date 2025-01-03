import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { TrialService } from '../../modules/trial/trial-services';
import CreateTrialCommand from '@triumph/application/queries/trial/add/create-trial-command';

@Controller('trials')
export class TrialControllerWriter {
  constructor(private readonly trialService: TrialService) {}

  @Post()
  async create(
    @Body() body: { bikeId: number; startDate: Date; endDate: Date; kilometers: number },
    @Res() res: Response,
  ): Promise<Response> {
    const { bikeId, startDate, endDate, kilometers } = body;
    const createTrialCommand = new CreateTrialCommand(bikeId, startDate, endDate, kilometers);

    try {
      const trial = await this.trialService.createTrial(createTrialCommand);
      return res.status(201).json(trial);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur lors de la création de l\'essai.' });
    }
  }
}
