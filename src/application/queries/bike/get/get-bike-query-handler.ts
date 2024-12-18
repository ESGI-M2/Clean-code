import BikeRepositoryReader from '../../../ports/repositories/reader/bike-repository-reader';
import GetBikeQuery from './get-bike-query';
import { Bike } from '@triumph/domain/entity/bike';

export default class GetBikeQueryHandler {
  constructor(private readonly bikeRepository: BikeRepositoryReader) {}

  async execute(query: GetBikeQuery): Promise<Bike> {
    return await this.bikeRepository.getById(query.id);
  }
}