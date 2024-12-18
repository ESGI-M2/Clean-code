import { Occupation } from '@triumph/domain/entity/occupation';
import OccupationRepositoryReader from '../../../ports/repositories/reader/occupation-repository-reader';
import GetOccupationQuery from './get-occupation-query';

export default class GetOccupationQueryHandler {
  constructor(private readonly occupationRepository: OccupationRepositoryReader) {}

  async execute(query: GetOccupationQuery): Promise<Occupation> {
    return this.occupationRepository.getById(query.id);
  }
}
