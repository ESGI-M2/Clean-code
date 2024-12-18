import { Trial } from '@triumph/domain/entity/trial';
import TrialRepositoryReader from '../../../ports/repositories/reader/trial-repository-reader';
import GetTrialListQuery from './get-trial-list-query';

export default class GetTrialListQueryHandler {
  constructor(private readonly trialRepositoryReader: TrialRepositoryReader) {}

  async execute(query: GetTrialListQuery): Promise<Trial[] | null> {
    return await this.trialRepositoryReader.list();
  }
}
