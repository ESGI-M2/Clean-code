import { Request, Response } from 'express';
import GetGuaranteeListQueryHandler from '@triumph/application/queries/guarantee/get/get-guarantee-list-query-handler';
import GetGuaranteeListQuery from '@triumph/application/queries/guarantee/get/get-guarantee-list-query';
import GetGuaranteeQueryHandler from '@triumph/application/queries/guarantee/get/get-guarantee-query-handler';
import SearchGuaranteeQueryHandler from '@triumph/application/queries/guarantee/filter/search-guarantee-query-handler';
import GetGuaranteeQuery from '@triumph/application/queries/guarantee/get/get-guarantee-query';
import SearchGuaranteeQuery from '@triumph/application/queries/guarantee/filter/search-guarantee-query';
import GuaranteeRepositoryReader from '@triumph/application/ports/repositories/reader/guarantee-repository-reader';

export default class GuaranteeController {
  constructor(
    private readonly GuaranteeRepositoryReader: GuaranteeRepositoryReader
  ) {}

  async list(req: Request, res: Response): Promise<Response> {
    const listGuaranteeUsecase = new GetGuaranteeListQueryHandler(this.GuaranteeRepositoryReader);
    const guarantees = await listGuaranteeUsecase.execute(new GetGuaranteeListQuery());
    return res.status(200).json(guarantees);
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const numericId = parseInt(id, 10);

    if (isNaN(numericId)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    const getGuaranteeUsecase = new GetGuaranteeQueryHandler(this.GuaranteeRepositoryReader);
    const guarantee = await getGuaranteeUsecase.execute(new GetGuaranteeQuery(numericId));

    if (!guarantee) {
      return res.status(404).json({ message: 'Guarantee not found' });
    }

    return res.status(200).json(guarantee);
  }

  async search(req: Request, res: Response): Promise<Response> {
    const { keyword } = req.params;

    const searchGuaranteeUsecase = new SearchGuaranteeQueryHandler(this.GuaranteeRepositoryReader);
    const guarantees = await searchGuaranteeUsecase.execute(new SearchGuaranteeQuery(keyword));

    return res.status(200).json(guarantees);
  }
}
