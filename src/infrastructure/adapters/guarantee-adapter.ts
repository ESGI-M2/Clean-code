import { Guarantee } from '@triumph/domain/entity/guarantee';
import { toDomainVisit } from './visit-adapter';

export function toDomainGuarantee(guaranteeModel: any): Guarantee {
  const visit = toDomainVisit(guaranteeModel.visit);

  return new Guarantee(
    guaranteeModel.id,
    visit,
    guaranteeModel.startDate,
    guaranteeModel.endDate,
    guaranteeModel.type
  );
}
