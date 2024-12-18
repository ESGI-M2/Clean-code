import { BikeModel } from '@triumph/domain/entity/bike-model';
import BikeModelRepositoryWriter from '../../../ports/repositories/writer/bike-model-repository-writer';
import CreateBikeModelCommand from './create-bike-model-command';

export default class CreateBikeModelCommandHandler {
  constructor(
    private readonly bikeModelRepositoryWriter: BikeModelRepositoryWriter
  ) {}

  async execute(command: CreateBikeModelCommand): Promise<BikeModel> {
    const bikeModel = new BikeModel(0, command.name);
    return await this.bikeModelRepositoryWriter.add(bikeModel);
  }
}
