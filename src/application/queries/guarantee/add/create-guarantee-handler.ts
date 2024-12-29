import { Guarantee } from '@triumph/domain/entity/guarantee';
import GuaranteeRepositoryWriter from '@triumph/application/ports/repositories/writer/guarantee-repository-writer';
import VisitRepositoryReader from '@triumph/application/ports/repositories/reader/visit-repository-reader';
import CreateGuaranteeCommand from './create-guarantee-command';

export default class CreateGuaranteeCommandHandler {
  constructor(
    private readonly guaranteeRepositoryWriter: GuaranteeRepositoryWriter,
    private readonly visitRepositoryReader: VisitRepositoryReader
  ) {}

  async execute(command: CreateGuaranteeCommand): Promise<Guarantee> {
    const visit = await this.visitRepositoryReader.getById(command.visitId);
    if (!visit) {
      throw new Error('Visit not found');
    }

    const guarantee = new Guarantee(
      0,
      visit,
      command.startDate,
      command.endDate,
      command.type
    );

    return await this.guaranteeRepositoryWriter.add(guarantee);
  }
}
