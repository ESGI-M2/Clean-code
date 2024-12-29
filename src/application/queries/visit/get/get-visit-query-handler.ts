import { Visit } from '@triumph/domain/entity/visit';
import VisitRepositoryReader from '../../../ports/repositories/reader/visit-repository-reader';
import GetVisitQuery from './get-visit-query';

export default class GetTrialQueryHandler {
  constructor(private readonly visitRepositoryReader: VisitRepositoryReader) {}

  async execute(query: GetVisitQuery): Promise<Visit | null> {
    return this.visitRepositoryReader.getById(query.id);
  }
}
