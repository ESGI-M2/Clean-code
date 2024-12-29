import { Trial } from '@triumph/domain/entity/trial';
import TrialModel from '../../models/trial.model';
import BikeModel from '../../models/bike.model';
import TrialRepositoryWriter from '@triumph/application/ports/repositories/writer/trial-repository-writer';
import { toDomainBike } from '../../../../../adapters/bike-adapter';

export default class SequelizeTrialRepositoryWriter implements TrialRepositoryWriter {
  async add(trial: Trial): Promise<Trial> {
    const bikeData = await BikeModel.findByPk(trial.bike.id, { include: ['customer'] });
    if (!bikeData) {
      throw new Error('Bike not found');
    }

    const bike = toDomainBike(bikeData);

    const trialModel = await TrialModel.create({
      bikeId: bike.id,
      startDate: trial.startDate,
      endDate: trial.endDate,
      kilometers: trial.kilometers,
    });

    return new Trial(
      trialModel.id,
      bike,
      trialModel.startDate,
      trialModel.endDate,
      trialModel.kilometers
    );
  }
}
