import { Error as SequelizeError } from 'sequelize';

import PartnerRepositoryReader from '@triumph/application/ports/repositories/readers/partner.repository-reader';
import { Partner } from '@triumph/domain/entity/partner';

import PartnerModel from '../../models/partner.model';

export default class SequelizePartnerRepository implements PartnerRepositoryReader {
  async list(): Promise<Partner[]> {
    const partners = await PartnerModel.findAll();

    return partners.map((partner) => new Partner(partner.id, partner.name, partner.email, partner.dealerId));
  }

  async getById(id: string): Promise<Partner | null> {
    try {
      const partner = await PartnerModel.findByPk(id);

      if (!partner) {
        return null;
      }

      return new Partner(partner.id, partner.name, partner.email, partner.dealerId);
    } catch (error: unknown) {
      if (error instanceof SequelizeError) {
        return null;
      }

      throw error;
    }
  }
}
