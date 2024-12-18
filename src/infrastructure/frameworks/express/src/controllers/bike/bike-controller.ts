import { Request, Response } from 'express';
import GetBikeListQuery from '@triumph/application/queries/bike/get/get-bike-list-query';
import BikeRepositoryReader from '@triumph/application/ports/repositories/reader/bike-repository-reader';
import GetBikeListQueryHandler from '@triumph/application/queries/bike/get/get-bike-list-query-handler';
import GetBikeQuery from '@triumph/application/queries/bike/get/get-bike-query';
import GetBikeQueryHandler from '@triumph/application/queries/bike/get/get-bike-query-handler';
import SearchBikeQuery from '@triumph/application/queries/bike/filter/search-bike-query';
import SearchBikeQueryHandler from '@triumph/application/queries/bike/filter/search-bike-query-handler';

export default class BikeController {
  constructor(private readonly BikeRepositoryReader: BikeRepositoryReader) {}

  async list(req: Request, res: Response): Promise<Response> {
    const listBikeUsecase = new GetBikeListQueryHandler(this.BikeRepositoryReader);
    const bikes = await listBikeUsecase.execute(new GetBikeListQuery());
    return res.status(200).json(bikes);
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    const getBikeUsecase = new GetBikeQueryHandler(this.BikeRepositoryReader);
    const bike = await getBikeUsecase.execute(new GetBikeQuery(numericId));

    return res.status(200).json(bike);
  }

  async search(req: Request, res: Response): Promise<Response> {
    const { keyword } = req.params;

    const searchBikeUsecase = new SearchBikeQueryHandler(this.BikeRepositoryReader);
    const bikes = await searchBikeUsecase.execute(new SearchBikeQuery(keyword));

    return res.status(200).json(bikes);
  }
}
