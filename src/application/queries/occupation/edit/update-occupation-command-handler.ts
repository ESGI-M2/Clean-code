import { Occupation } from '@triumph/domain/entity/occupation';
import OccupationRepositoryReader from '../../../ports/repositories/occupation-repository-reader';
import OccupationRepositoryWriter from '../../../ports/repositories/writer/occupation-repository-writer';
import UpdateOccupationCommand from './update-occupation-command';

export default class UpdateOccupationCommandHandler {
  constructor(
    private readonly occupationRepositoryReader: OccupationRepositoryReader,
    private readonly occupationRepositoryWriter: OccupationRepositoryWriter
  ) {}

  async execute(command: UpdateOccupationCommand): Promise<Occupation> {
    const existingOccupation = await this.occupationRepositoryReader.getById(command.id);

    if (!existingOccupation) {
      throw new Error(`Occupation with ID ${command.id} not found`);
    }

    existingOccupation.name = command.name;

    return await this.occupationRepositoryWriter.edit(existingOccupation);
  }
}
