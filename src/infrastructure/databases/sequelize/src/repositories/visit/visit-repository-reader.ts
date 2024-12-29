import { Visit } from '@triumph/domain/entity/visit';
import VisitModel from '../../models/visit.model';
import BikeModel from '../../models/bike.model';
import CustomerModel from '../../models/customer.model';
import BikeModelModel from '../../models/bike-model.model';
import DrivingLicenseModel from '../../models/driving-licence.model';
import { Op } from 'sequelize';
import VisitRepositoryReader from '@triumph/application/ports/repositories/reader/visit-repository-reader';
import { toDomainVisit } from '../../../../../adapters/visit-adapter';

export default class SequelizeVisitRepositoryReader implements VisitRepositoryReader {
  async list(): Promise<Visit[]> {
    try {
      const visits = await VisitModel.findAll({
        include: [
          {
            model: BikeModel,
            as: 'bike',
            include: [
              {
                model: BikeModelModel,
                as: 'bikeModel' 
              },
              {
                model: CustomerModel,
                as: 'customer',
                include: [
                  {
                    model: DrivingLicenseModel,
                    as: 'drivingLicense',
                  },
                ],
              },
            ],
          },
        ],
      });

      return visits
        .map(visit => {
          const bike = visit.bike;
          if (!bike) {
            console.warn(`Visit with id ${visit.id} has no associated bike`);
            return null;
          }

          const customer = bike.customer;
          if (!customer) {
            console.warn(`Bike with id ${bike.id} has no associated customer`);
            return null;
          }

          return toDomainVisit(visit);
        })
        .filter((visit): visit is Visit => visit !== null);
    } catch (error) {
      console.error('Error retrieving visits:', error);
      throw new Error('Error retrieving visits: ' + error);
    }
  }

  async getById(visitId: number): Promise<Visit | null> {
    try {
      const visit = await VisitModel.findByPk(visitId, {
        include: [
          {
            model: BikeModel,
            as: 'bike',
            include: [
              {
                model: CustomerModel,
                as: 'customer',
                include: [
                  {
                    model: DrivingLicenseModel,
                    as: 'drivingLicense',
                  },
                ],
              },
            ],
          },
        ],
      });

      if (!visit) return null;
      return toDomainVisit(visit);
    } catch (error) {
      console.error('Error retrieving visit by ID:', error);
      throw new Error('Error retrieving visit by ID: ' + error);
    }
  }

  async search(keyword: string): Promise<Visit[]> {
    try {
      const visits = await VisitModel.findAll({
        where: {
          visitDate: { [Op.iLike]: `%${keyword}%` },
        },
        include: [
          {
            model: BikeModel,
            as: 'bike',
            include: [
              {
                model: CustomerModel,
                as: 'customer',
                include: [
                  {
                    model: DrivingLicenseModel,
                    as: 'drivingLicense',
                  },
                ],
              },
            ],
          },
        ],
      });

      return visits.map(visit => toDomainVisit(visit));
    } catch (error) {
      console.error('Error searching visits:', error);
      throw new Error('Error searching visits: ' + error);
    }
  }
}
