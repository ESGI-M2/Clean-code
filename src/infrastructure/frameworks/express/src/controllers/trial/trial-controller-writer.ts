import { Request, Response } from 'express';
import CreateTrialCommandHandler from '@triumph/application/queries/trial/add/create-trial-handler';
import TrialRepositoryWriter from '@triumph/application/ports/repositories/writer/trial-repository-writer';
import BikeRepositoryReader from '@triumph/application/ports/repositories/reader/bike-repository-reader';
import CreateTrialCommand from '@triumph/application/queries/trial/add/create-trial-command';

export default class TrialControllerWriter {
  constructor(
    private readonly TrialRepositoryWriter: TrialRepositoryWriter,
    private readonly BikeRepositoryReader: BikeRepositoryReader
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    const { bikeId, startDate, endDate, kilometers } = req.body;

    const createTrialCommandHandler = new CreateTrialCommandHandler(
      this.TrialRepositoryWriter,
      this.BikeRepositoryReader
    );

    try {
      const trial = await createTrialCommandHandler.execute(new CreateTrialCommand(
        bikeId,
        startDate,
        endDate,
        kilometers
      ));

      return res.status(201).json(trial);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur lors de la création de l\'essai.' });
    }
  }
}
