import TrialRepositoryReader from '../../../ports/repositories/reader/trial-repository-reader';
import SearchTrialQuery from './search-trial-query';
import { Trial } from '@triumph/domain/entity/trial';

export default class SearchTrialQueryHandler {
  constructor(private readonly trialRepositoryReader: TrialRepositoryReader) {}

  async execute(query: SearchTrialQuery): Promise<Trial[]> {
    return this.trialRepositoryReader.search(query.keyword);
  }
}
