import BikeRepositoryReader from '../../../ports/repositories/reader/bike-repository-reader';
import GetBikeListQuery from './get-bike-list-query';
import { Bike } from '@triumph/domain/entity/bike';

export default class GetBikeListQueryHandler {
  constructor(private readonly bikeRepositoryReader: BikeRepositoryReader) {}

  async execute(query: GetBikeListQuery): Promise<Bike[]> {
    return await this.bikeRepositoryReader.list();
  }
}
