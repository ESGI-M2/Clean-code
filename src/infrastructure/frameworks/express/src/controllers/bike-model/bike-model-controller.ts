import { Request, Response } from 'express';
import GetBikeModelListQuery from '@triumph/application/queries/bike-model/get/get-bike-model-list-query';
import BikeModelRepositoryReader from '@triumph/application/ports/repositories/reader/bike-model-repository-reader';
import GetBikeModelListQueryHandler from '@triumph/application/queries/bike-model/get/get-bike-model-list-query-handler';
import GetBikeModelQuery from '@triumph/application/queries/bike-model/get/get-bike-model-query';
import GetBikeModelQueryHandler from '@triumph/application/queries/bike-model/get/get-bike-model-query-handler';
import SearchBikeModelQueryHandler from '@triumph/application/queries/bike-model/filter/search-bike-model-query-handler';
import SearchBikeModelQuery from '@triumph/application/queries/bike-model/filter/search-bike-model-query';

export default class BikeModelController {
  constructor(private readonly BikeModelRepositoryReader: BikeModelRepositoryReader) {}

  async list(req: Request, res: Response): Promise<Response> {
    const listBikeModelUsecase = new GetBikeModelListQueryHandler(this.BikeModelRepositoryReader);
    const bikeModels = await listBikeModelUsecase.execute(new GetBikeModelListQuery());
    return res.status(200).json(bikeModels);
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    const getBikeModelUsecase = new GetBikeModelQueryHandler(this.BikeModelRepositoryReader);
    const bikeModel = await getBikeModelUsecase.execute(new GetBikeModelQuery(numericId));

    return res.status(200).json(bikeModel);
  }

  async search(req: Request, res: Response): Promise<Response> {
    const { keyword } = req.params;
    const searchBikeModelUsecase = new SearchBikeModelQueryHandler(this.BikeModelRepositoryReader);
    const bikeModels = await searchBikeModelUsecase.execute(new SearchBikeModelQuery(keyword));

    return res.status(200).json(bikeModels);
  }
}
