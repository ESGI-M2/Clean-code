import { Request, Response } from 'express';
import GetTrialListQueryHandler from '@triumph/application/queries/trial/get/get-trial-list-query-handler';
import GetTrialListQuery from '@triumph/application/queries/trial/get/get-trial-list-query';
import GetTrialQueryHandler from '@triumph/application/queries/trial/get/get-trial-query-handler';
import SearchTrialQueryHandler from '@triumph/application/queries/trial/filter/search-trial-query-handler';
import GetTrialQuery from '@triumph/application/queries/trial/get/get-trial-query';
import SearchTrialQuery from '@triumph/application/queries/trial/filter/search-trial-query';
import TrialRepositoryReader from '@triumph/application/ports/repositories/reader/trial-repository-reader';

export default class TrialController {
  constructor(
    private readonly TrialRepositoryReader: TrialRepositoryReader
  ) {}

  async list(req: Request, res: Response): Promise<Response> {
    const listTrialUsecase = new GetTrialListQueryHandler(this.TrialRepositoryReader);
    const trials = await listTrialUsecase.execute(new GetTrialListQuery());
    return res.status(200).json(trials);
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const numericId = parseInt(id, 10);

    if (isNaN(numericId)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    const getTrialUsecase = new GetTrialQueryHandler(this.TrialRepositoryReader);
    const trial = await getTrialUsecase.execute(new GetTrialQuery(numericId));

    if (!trial) {
      return res.status(404).json({ message: 'Trial not found' });
    }

    return res.status(200).json(trial);
  }

  async search(req: Request, res: Response): Promise<Response> {
    const { keyword } = req.params;

    const searchTrialUsecase = new SearchTrialQueryHandler(this.TrialRepositoryReader);
    const trials = await searchTrialUsecase.execute(new SearchTrialQuery(keyword));

    return res.status(200).json(trials);
  }
}
