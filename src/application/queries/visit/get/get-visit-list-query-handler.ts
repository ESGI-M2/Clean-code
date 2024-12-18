import { Visit } from '@triumph/domain/entity/visit';
import VisitRepositoryReader from '../../../ports/repositories/reader/visit-repository-reader';
import GetVisitListQuery from './get-visit-list-query';

export default class GetVisitListQueryHandler {
  constructor(private readonly visitRepositoryReader: VisitRepositoryReader) {}

  async execute(query: GetVisitListQuery): Promise<Visit[] | null> {
    return await this.visitRepositoryReader.list();
  }
}
