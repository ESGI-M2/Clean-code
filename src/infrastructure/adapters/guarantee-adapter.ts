import { Guarantee } from '@triumph/domain/entity/guarantee';
import { Visit } from '@triumph/domain/entity/visit';
import { toDomainVisit } from './visit-adapter';  // Adaptateur pour la visite

export function toDomainGuarantee(guaranteeModel: any): Guarantee {
  const visit = toDomainVisit(guaranteeModel.visit); // Transforme le modèle Visit en entité Visit

  return new Guarantee(
    guaranteeModel.id,
    visit,  // Associe la visite transformée
    guaranteeModel.startDate,
    guaranteeModel.endDate,
    guaranteeModel.type
  );
}
