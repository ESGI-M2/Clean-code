import { Trial } from '@triumph/domain/entity/trial';
import TrialRepositoryReader from '../../../ports/repositories/reader/trial-repository-reader';
import GetTrialQuery from './get-trial-query';

export default class GetTrialQueryHandler {
  constructor(private readonly trialRepositoryReader: TrialRepositoryReader) {}

  async execute(query: GetTrialQuery): Promise<Trial | null> {
    return this.trialRepositoryReader.getById(query.id);
  }
}
