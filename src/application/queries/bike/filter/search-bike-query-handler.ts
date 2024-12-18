import { Bike } from '@triumph/domain/entity/bike';
import BikeRepositoryReader from '../../../ports/repositories/reader/bike-repository-reader';
import SearchBikeQuery from './search-bike-query';

export default class SearchBikeQueryHandler {
  constructor(private readonly bikeRepositoryReader: BikeRepositoryReader) {}

  async execute(query: SearchBikeQuery): Promise<Bike[]> {
    return this.bikeRepositoryReader.search(query.keyword);
  }
}
