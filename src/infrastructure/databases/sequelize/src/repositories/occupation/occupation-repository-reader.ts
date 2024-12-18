import { Occupation } from '@triumph/domain/entity/occupation';
import OccupationModel from '../../models/occupation.model';
import OccupationRepositoryReader from '@triumph/application/ports/repositories/reader/occupation-repository-reader';
import { Op } from 'sequelize';

export default class SequelizeOccupationRepository implements OccupationRepositoryReader {
  async list(): Promise<Occupation[]> {
    const occupations = await OccupationModel.findAll();

    return occupations.map((occupation) => new Occupation(occupation.id, occupation.name));
  }

  async getById(id: number): Promise<Occupation> {
    const occupation = await OccupationModel.findByPk(id);

    if (!occupation) {
      throw new Error('Occupation not found');
    }

    return new Occupation(occupation.id, occupation.name);
  }

  async search(keyword: string): Promise<Occupation[]> {
    const occupations = await OccupationModel.findAll({
      where: {
        name: {
          [Op.iLike]: `%${keyword}%`,
        },
      },
    });

    return occupations.map((occupation) => new Occupation(occupation.id, occupation.name));
  }
}
