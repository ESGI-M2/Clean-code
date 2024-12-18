import { Occupation } from '@triumph/domain/entity/occupation';
import OccupationRepositoryReader from '../../../ports/repositories/reader/occupation-repository-reader';
import SearchOccupationQuery from './search-occupation-query';

export default class SearchoccupationQueryHandler {
  constructor(private readonly occupationRepository: OccupationRepositoryReader) {}

  async execute(query: SearchOccupationQuery): Promise<Occupation[]> {
    return this.occupationRepository.search(query.keyword);
  }
}