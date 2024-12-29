import { Guarantee } from '@triumph/domain/entity/guarantee';
import GuaranteeModel from '../../models/guarantee.model';
import VisitModel from '../../models/visit.model';
import GuaranteeRepositoryWriter from '@triumph/application/ports/repositories/writer/guarantee-repository-writer';
import { toDomainVisit } from '../../../../../adapters/visit-adapter';

export default class SequelizeGuaranteeRepositoryWriter implements GuaranteeRepositoryWriter {
  async add(guarantee: Guarantee): Promise<Guarantee> {
    const visitData = await VisitModel.findByPk(guarantee.visit.id, { include: ['bike'] });
    if (!visitData) {
      throw new Error('Visit not found');
    }

    const visit = toDomainVisit(visitData);

    const guaranteeModel = await GuaranteeModel.create({
      visitId: visit.id,
      startDate: guarantee.startDate,
      endDate: guarantee.endDate,
      type: guarantee.type,
    });

    return new Guarantee(
      guaranteeModel.id,
      visit,
      guaranteeModel.startDate,
      guaranteeModel.endDate,
      guaranteeModel.type
    );
  }
}
