import { Request, Response } from 'express';
import GetVisitListQueryHandler from '@triumph/application/queries/visit/get/get-visit-list-query-handler';
import GetVisitListQuery from '@triumph/application/queries/visit/get/get-visit-list-query';
import GetVisitQueryHandler from '@triumph/application/queries/visit/get/get-visit-query-handler';
import SearchVisitQueryHandler from '@triumph/application/queries/visit/filter/search-visit-query-handler';
import GetVisitQuery from '@triumph/application/queries/visit/get/get-visit-query';
import SearchVisitQuery from '@triumph/application/queries/visit/filter/search-visit-query';
import VisitRepositoryReader from '@triumph/application/ports/repositories/reader/visit-repository-reader';

export default class VisitController {
  constructor(
    private readonly VisitRepositoryReader: VisitRepositoryReader
  ) {}

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const listVisitUsecase = new GetVisitListQueryHandler(this.VisitRepositoryReader);
      const visits = await listVisitUsecase.execute(new GetVisitListQuery());
      return res.status(200).json(visits);
    } catch (error) {
      console.error('Error listing visits:', error);
      return res.status(500).json({ message: 'Error listing visits' });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const numericId = parseInt(id, 10);

    if (isNaN(numericId)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    try {
      const getVisitUsecase = new GetVisitQueryHandler(this.VisitRepositoryReader);
      const visit = await getVisitUsecase.execute(new GetVisitQuery(numericId));

      if (!visit) {
        return res.status(404).json({ message: 'Visit not found' });
      }

      return res.status(200).json(visit);
    } catch (error) {
      console.error('Error retrieving visit:', error);
      return res.status(500).json({ message: 'Error retrieving visit' });
    }
  }

  async search(req: Request, res: Response): Promise<Response> {
    const { keyword } = req.params;

    try {
      const searchVisitUsecase = new SearchVisitQueryHandler(this.VisitRepositoryReader);
      const visits = await searchVisitUsecase.execute(new SearchVisitQuery(keyword));
      return res.status(200).json(visits);
    } catch (error) {
      console.error('Error searching visits:', error);
      return res.status(500).json({ message: 'Error searching visits' });
    }
  }
}
