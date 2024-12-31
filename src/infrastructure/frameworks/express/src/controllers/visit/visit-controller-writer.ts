import { Request, Response } from 'express';
import CreateVisitCommandHandler from '@triumph/application/queries/visit/add/create-visit-handler';
import VisitRepositoryWriter from '@triumph/application/ports/repositories/writer/visit-repository-writer';
import BikeRepositoryReader from '@triumph/application/ports/repositories/reader/bike-repository-reader';
import CreateVisitCommand from '@triumph/application/queries/visit/add/create-visit-command';

export default class VisitControllerWriter {
  constructor(
    private readonly VisitRepositoryWriter: VisitRepositoryWriter,
    private readonly BikeRepositoryReader: BikeRepositoryReader
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    const { bikeModelId, visitDate, price, recapitulation } = req.body;

    const createVisitCommandHandler = new CreateVisitCommandHandler(
      this.VisitRepositoryWriter,
      this.BikeRepositoryReader
    );

    try {
      const visit = await createVisitCommandHandler.execute(new CreateVisitCommand(
        bikeModelId,
        visitDate,
        price,
        recapitulation
      ));

      return res.status(201).json(visit);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur lors de la création de la visite.' });
    }
  }
}
