import { Request, Response } from 'express';
import CreateGuaranteeCommandHandler from '@triumph/application/queries/guarantee/add/create-guarantee-handler';
import GuaranteeRepositoryWriter from '@triumph/application/ports/repositories/writer/guarantee-repository-writer';
import VisitRepositoryReader from '@triumph/application/ports/repositories/reader/visit-repository-reader';
import CreateGuaranteeCommand from '@triumph/application/queries/guarantee/add/create-guarantee-command';

export default class GuaranteeControllerWriter {
  constructor(
    private readonly GuaranteeRepositoryWriter: GuaranteeRepositoryWriter,
    private readonly VisitRepositoryReader: VisitRepositoryReader
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    const { visitId, startDate, endDate, type } = req.body;

    const createGuaranteeCommandHandler = new CreateGuaranteeCommandHandler(
      this.GuaranteeRepositoryWriter,
      this.VisitRepositoryReader
    );

    try {
      const guarantee = await createGuaranteeCommandHandler.execute(new CreateGuaranteeCommand(
        visitId,
        startDate,
        endDate,
        type
      ));

      return res.status(201).json(guarantee);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur lors de la création de la garantie.' });
    }
  }
}
