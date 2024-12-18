import { Guarantee } from '@triumph/domain/entity/guarantee';
import GuaranteeRepositoryReader from '../../../ports/repositories/reader/guarantee-repository-reader';
import GetGuaranteeQuery from './get-guarantee-query';

export default class GetGuaranteeQueryHandler {
  constructor(private readonly guaranteeRepositoryReader: GuaranteeRepositoryReader) {}

  async execute(query: GetGuaranteeQuery): Promise<Guarantee | null> {
    return this.guaranteeRepositoryReader.getById(query.id);
  }
}
