import { Request, Response } from 'express';
import CreateBikeModelCommandHandler from '@triumph/application/queries/bike-model/add/create-bike-model-handler';
import BikeModelRepositoryWriter from '@triumph/application/ports/repositories/writer/bike-model-repository-writer';
import CreateBikeModelCommand from '@triumph/application/queries/bike-model/add/create-bike-model-command';

export default class BikeModelControllerWriter {
  constructor(private readonly BikeModelRepositoryWriter: BikeModelRepositoryWriter) {}

  async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    const searchBikeModelUsecase = new CreateBikeModelCommandHandler(this.BikeModelRepositoryWriter);
    const bikeModels = await searchBikeModelUsecase.execute(new CreateBikeModelCommand(name));

    return Promise.resolve(res.status(201).json(bikeModels));
  }
}
