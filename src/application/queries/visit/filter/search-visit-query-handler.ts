import VisitRepositoryReader from '../../../ports/repositories/reader/visit-repository-reader';
import SearchVisitQuery from './search-visit-query';
import { Visit } from '@triumph/domain/entity/visit';

export default class SearchVisitQueryHandler {
  constructor(private readonly visitRepositoryReader: VisitRepositoryReader) {}

  async execute(query: SearchVisitQuery): Promise<Visit[]> {
    return this.visitRepositoryReader.search(query.keyword);
  }
}
