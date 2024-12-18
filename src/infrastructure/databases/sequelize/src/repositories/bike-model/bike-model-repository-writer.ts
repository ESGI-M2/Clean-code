import { BikeModel } from '@triumph/domain/entity/bike-model';
import BikeModelModel from '../../models/bike-model.model';
import BikeModelRepositoryWriter from '@triumph/application/ports/repositories/writer/bike-model-repository-writer';

export default class SequelizeBikeModelRepositoryWriter implements BikeModelRepositoryWriter {
  async add(bikeModel: BikeModel): Promise<BikeModel> {
    try {
      const newBikeModel = await BikeModelModel.create({
        name: bikeModel.name,
      });

      return new BikeModel(newBikeModel.id, newBikeModel.name);
    } catch (error) {
      console.error("Erreur lors de la création du model de moto :", error);
      throw new Error("Erreur lors de la création du model de moto");
    }
  }
}
