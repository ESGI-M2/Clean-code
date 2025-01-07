import { Occupation } from '@triumph/domain/entity/occupation';

import OccupationRepositoryReader from '../../../ports/repositories/reader/occupation-repository-reader';
import GetOccupationListQuery from './get-occupation-list-query';

export default class GetOccupationListQueryHandler {
  constructor(private readonly occupationRepositoryReader: OccupationRepositoryReader) {}

  async execute(query: GetOccupationListQuery): Promise<Occupation[]> {
    return await this.occupationRepositoryReader.list();
  }
}
