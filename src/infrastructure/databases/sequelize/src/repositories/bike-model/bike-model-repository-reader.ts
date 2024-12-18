import { BikeModel } from '@triumph/domain/entity/bike-model';
import BikeModelModel from '../../models/bike-model.model';
import BikeModelRepositoryReader from '@triumph/application/ports/repositories/reader/bike-model-repository-reader';
import { Op } from 'sequelize';

export default class SequelizeBikeModelRepository implements BikeModelRepositoryReader {
  async list(): Promise<BikeModel[]> {
    const bikeModels = await BikeModelModel.findAll();

    return bikeModels.map((bikeModel) => new BikeModel(bikeModel.id, bikeModel.name));
  }

  async getById(id: number): Promise<BikeModel> {
    const bikeModel = await BikeModelModel.findByPk(id);

    if (!bikeModel) {
      throw new Error('Bike model not found');
    }

    return new BikeModel(bikeModel.id, bikeModel.name);
  }

  async search(keyword: string): Promise<BikeModel[]> {
    const bikeModels = await BikeModelModel.findAll({
      where: {
        name: {
          [Op.iLike]: `%${keyword}%`,
        },
      },
    });

    return bikeModels.map((bikeModel) => new BikeModel(bikeModel.id, bikeModel.name));
  }
}
