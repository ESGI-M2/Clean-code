import { Occupation } from '@triumph/domain/entity/occupation';
import OccupationRepositoryWriter from '../../../ports/repositories/writer/occupation-repository-writer';
import CreateOccupationCommand from './create-occupation-command';

export default class CreateOccupationCommandHandler {
  constructor(
    private readonly occupationRepositoryWriter: OccupationRepositoryWriter
  ) {}

  async execute(command: CreateOccupationCommand): Promise<Occupation> {
    const occupation = new Occupation(0, command.name);
    return await this.occupationRepositoryWriter.add(occupation);
  }
}
