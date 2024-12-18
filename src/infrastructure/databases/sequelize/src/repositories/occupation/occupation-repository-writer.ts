import { Occupation } from '@triumph/domain/entity/occupation';
import OccupationModel from '../../models/occupation.model';
import OccupationRepositoryWriter from '@triumph/application/ports/repositories/writer/occupation-repository-writer';

export default class SequelizeOccupationRepositoryWriter implements OccupationRepositoryWriter {
  async add(occupation: Occupation): Promise<Occupation> {
    try {
      const newOccupation = await OccupationModel.create({
        name: occupation.name,
      });

      return new Occupation(newOccupation.id, newOccupation.name);
    } catch (error) {
      console.error("Erreur lors de la création de l'occupation :", error);
      throw new Error("Erreur lors de la création de l'occupation");
    }
  }

 /* async edit(occupation: Occupation): Promise<Occupation> {
    try {
      const [updatedCount] = await OccupationModel.update(
        { name: occupation.name },
        { where: { id: occupation.id } }
      );

      if (updatedCount === 0) {
        throw new Error(`Occupation avec l'ID ${occupation.id} non trouvée.`);
      }

      return occupation;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'occupation :", error);
      throw new Error("Erreur lors de la mise à jour de l'occupation");
    }
  }
/*
  async delete(id: number): Promise<void> {
    try {
      const deletedCount = await OccupationModel.destroy({
        where: { id },
      });

      if (deletedCount === 0) {
        throw new Error(`Occupation avec l'ID ${id} non trouvée.`);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'occupation :", error);
      throw new Error("Erreur lors de la suppression de l'occupation");
    }
  }*/
}
