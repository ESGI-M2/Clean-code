import { Visit } from '@triumph/domain/entity/visit';  // Entité de domaine Visit
import VisitModel from '../databases/sequelize/src/models/visit.model';  // Modèle Sequelize de Visit
import { toDomainBike } from './bike-adapter';  // Adapter le vélo

export function toDomainVisit(visitModel: VisitModel): Visit {
  return new Visit(
    visitModel.id,
    toDomainBike(visitModel.bike),
    visitModel.visitDate,
    visitModel.price,
    visitModel.recapitulation,
  );
}
