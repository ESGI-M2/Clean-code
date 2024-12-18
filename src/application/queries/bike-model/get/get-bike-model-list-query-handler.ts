import BikeModelRepositoryReader from '../../../ports/repositories/reader/bike-model-repository-reader';
import GetBikeModelListQuery from './get-bike-model-list-query';
import { BikeModel } from '@triumph/domain/entity/bike-model';

export default class GetBikeModelListQueryHandler {
  constructor(private readonly bikeModelRepositoryReader: BikeModelRepositoryReader) {}

  async execute(query: GetBikeModelListQuery): Promise<BikeModel[]> {
    return await this.bikeModelRepositoryReader.list();
  }
}
