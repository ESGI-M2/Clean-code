import { Trial } from '@triumph/domain/entity/trial';
import TrialModel from '../databases/sequelize/src/models/trial.model';
import { toDomainBike } from './bike-adapter';

export function toDomainTrial(trialModel: TrialModel): Trial {
  return new Trial(
    trialModel.id,
    toDomainBike(trialModel.bike),
    trialModel.startDate,
    trialModel.endDate,
    trialModel.kilometers
  );
}
