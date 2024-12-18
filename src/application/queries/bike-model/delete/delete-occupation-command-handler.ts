import { Occupation } from '@triumph/domain/entity/occupation';
import OccupationRepositoryReader from '../../../ports/repositories/occupation-repository-reader';
import OccupationRepositoryWriter from '../../../ports/repositories/writer/occupation-repository-writer';
import DeleteOccupationCommand from './delete-occupation-command';

export default class DeleteOccupationCommandHandler {
  constructor(
    private readonly occupationRepositoryReader: OccupationRepositoryReader,
    private readonly occupationRepositoryWriter: OccupationRepositoryWriter
  ) {}

  async execute(command: DeleteOccupationCommand): Promise<void> {
    // Recherche de l'occupation par ID
    const existingOccupation = await this.occupationRepositoryReader.getById(command.id);

    if (!existingOccupation) {
      throw new Error(`Occupation with ID ${command.id} not found`);
    }

    // Suppression de l'occupation via le repository
    await this.occupationRepositoryWriter.delete(command.id);
  }
}
