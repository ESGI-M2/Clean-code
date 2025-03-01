import { BikeModelNotFoundError } from '@triumph/domain/errors/bike-models/bike-model-not-found.error';

import BikeModelDTO from '../../../interfaces/dtos/bike-model.dto';
import BikeModelDTOMapper from '../../../interfaces/mappers/bike-model.dto-mapper';
import BikeModelRepositoryReader from '../../../ports/repositories/readers/bike-model.repository-reader';
import GetBikeModelByIdentifierQuery from './get-bike-model-by-identifier.query';
import GetBikeModelByIdentifierQueryValidator from './get-bike-model-by-identifier.query-validator';
import GetBikeModelByIdentifierUseCase from './get-bike-model-by-identifier.usecase';

export default class GetBikeModelByIdentifierQueryHandler implements GetBikeModelByIdentifierUseCase {
  constructor(private readonly bikeModelRepository: BikeModelRepositoryReader) {}

  async execute(getBikeModelByIdentifierQuery: GetBikeModelByIdentifierQuery): Promise<BikeModelDTO> {
    new GetBikeModelByIdentifierQueryValidator().validateQuery(getBikeModelByIdentifierQuery);

    const bikeModelIdInput = getBikeModelByIdentifierQuery.id.trim();
    const foundBikeModel = await this.bikeModelRepository.getById(bikeModelIdInput);

    if (foundBikeModel !== null) {
      return BikeModelDTOMapper.toDTO(foundBikeModel);
    }

    throw new BikeModelNotFoundError();
  }
}
