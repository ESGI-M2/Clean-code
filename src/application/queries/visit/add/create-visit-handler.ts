import { Visit } from '@triumph/domain/entity/visit';
import VisitRepositoryWriter from '@triumph/application/ports/repositories/writer/visit-repository-writer';
import BikeRepositoryReader from '@triumph/application/ports/repositories/reader/bike-repository-reader';
import CreateVisitCommand from './create-visit-command';

export default class CreateVisitCommandHandler {
  constructor(
    private readonly visitRepositoryWriter: VisitRepositoryWriter,
    private readonly bikeRepositoryReader: BikeRepositoryReader
  ) {}

  async execute(command: CreateVisitCommand): Promise<Visit> {
    const bike = await this.bikeRepositoryReader.getById(command.bikeId);
    if (!bike) {
      throw new Error('Bike not found');
    }

    const visit = new Visit(
      0,
      bike,
      command.visitDate,
      command.price,
      command.recapitulation
    );

    return await this.visitRepositoryWriter.add(visit);
  }
}
