import { Request, Response } from 'express';
import CreateBikeCommandHandler from '@triumph/application/queries/bike/add/create-bike-handler';
import BikeRepositoryWriter from '@triumph/application/ports/repositories/writer/bike-repository-writer';
import CustomerRepositoryReader from '@triumph/application/ports/repositories/reader/customer-repository-reader';
import BikeModelRepositoryReader from '@triumph/application/ports/repositories/reader/bike-model-repository-reader';
import CreateBikeCommand from '@triumph/application/queries/bike/add/create-bike-command';

export default class BikeControllerWriter {
  constructor(
    private readonly BikeRepositoryWriter: BikeRepositoryWriter,
    private readonly CustomerRepositoryReader: CustomerRepositoryReader,
    private readonly BikeModelRepositoryReader: BikeModelRepositoryReader
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    const { customerId, bikeModelId, kilometers, status, circulationDate } = req.body;

    const createBikeCommandHandler = new CreateBikeCommandHandler(
      this.BikeRepositoryWriter,
      this.CustomerRepositoryReader,
      this.BikeModelRepositoryReader
    );

    try {
      const bike = await createBikeCommandHandler.execute(new CreateBikeCommand(
        customerId,
        bikeModelId,
        kilometers,
        status,
        circulationDate
      ));

      return res.status(201).json(bike);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur lors de la création du vélo.' });
    }
  }
}
