import { BikeModel } from '@triumph/domain/entity/bike-model';
import BikeModelRepositoryReader from '../../../ports/repositories/reader/bike-model-repository-reader';
import SearchBikeModelQuery from './search-bike-model-query';

export default class SearchbikeModelQueryHandler {
  constructor(private readonly bikeModelRepository: BikeModelRepositoryReader) {}

  async execute(query: SearchBikeModelQuery): Promise<BikeModel[]> {
    return this.bikeModelRepository.search(query.keyword);
  }
}