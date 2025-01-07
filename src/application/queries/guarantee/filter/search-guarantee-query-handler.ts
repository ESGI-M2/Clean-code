import { Guarantee } from '@triumph/domain/entity/guarantee';

import GuaranteeRepositoryReader from '../../../ports/repositories/reader/guarantee-repository-reader';
import SearchGuaranteeQuery from './search-guarantee-query';

export default class SearchGuaranteeQueryHandler {
  constructor(private readonly guaranteeRepositoryReader: GuaranteeRepositoryReader) {}

  async execute(query: SearchGuaranteeQuery): Promise<Guarantee[]> {
    return this.guaranteeRepositoryReader.search(query.keyword);
  }
}
