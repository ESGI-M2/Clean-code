import { BikeModel } from '@triumph/domain/entity/bike-model';
import BikeModelRepositoryReader from '../../../ports/repositories/reader/bike-model-repository-reader';
import GetBikeModelQuery from './get-bike-model-query';

export default class GetBikeModelQueryHandler {
  constructor(private readonly bikeModelRepository: BikeModelRepositoryReader) {}

  async execute(query: GetBikeModelQuery): Promise<BikeModel> {
    return this.bikeModelRepository.getById(query.id);
  }
}
