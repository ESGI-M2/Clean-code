import { Visit } from '@triumph/domain/entity/visit';
import VisitModel from '../databases/sequelize/src/models/visit.model';
import { toDomainBike } from './bike-adapter';

export function toDomainVisit(visitModel: VisitModel): Visit {
  return new Visit(
    visitModel.id,
    toDomainBike(visitModel.bike),
    visitModel.visitDate,
    visitModel.price,
    visitModel.recapitulation,
  );
}
