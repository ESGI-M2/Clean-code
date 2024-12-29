import { Trial } from '@triumph/domain/entity/trial';
import TrialRepositoryWriter from '@triumph/application/ports/repositories/writer/trial-repository-writer';
import BikeRepositoryReader from '@triumph/application/ports/repositories/reader/bike-repository-reader';
import CreateTrialCommand from './create-trial-command';

export default class CreateTrialCommandHandler {
  constructor(
    private readonly trialRepositoryWriter: TrialRepositoryWriter,
    private readonly bikeRepositoryReader: BikeRepositoryReader
  ) {}

  async execute(command: CreateTrialCommand): Promise<Trial> {
    const bike = await this.bikeRepositoryReader.getById(command.bikeId);
    if (!bike) {
      throw new Error('Bike not found');
    }

    const trial = new Trial(
      0,
      bike,
      command.startDate,
      command.endDate,
      command.kilometers
    );

    return await this.trialRepositoryWriter.add(trial);
  }
}
