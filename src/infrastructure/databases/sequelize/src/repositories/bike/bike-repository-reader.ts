import { Bike } from '@triumph/domain/entity/bike';
import { Customer } from '@triumph/domain/entity/customer';
import { BikeModel as BikeModelEntity } from '@triumph/domain/entity/bike-model';
import { DrivingLicense } from '@triumph/domain/entity/driving-license';
import { PermisStatus } from '@triumph/domain/entity/driving-license';
import BikeModel from '../../models/bike.model';
import CustomerModel from '../../models/customer.model';
import BikeModelModel from '../../models/bike-model.model';
import DrivingLicenseModel from '../../models/driving-licence.model';
import BikeRepositoryReader from '@triumph/application/ports/repositories/reader/bike-repository-reader';
import { Op } from 'sequelize';

export default class SequelizeBikeRepository implements BikeRepositoryReader {
  async list(): Promise<Bike[]> {
    const bikes = await BikeModel.findAll({
      include: [
        { model: CustomerModel, as: 'customer', include: [{ model: DrivingLicenseModel, as: 'drivingLicense' }] },
        { model: BikeModelModel, as: 'bikeModel' },
      ],
    });

    return bikes.map((bike) => new Bike(
      bike.id,
      new Customer(
        bike.customer.id,
        new DrivingLicense(
          bike.customer.drivingLicense.id,
          bike.customer.drivingLicense.emissionDate,
          this.mapStatus(bike.customer.drivingLicense.status),
          bike.customer.drivingLicense.country
        ),
        bike.customer.occupation,
        bike.customer.lastName,
        bike.customer.firstName,
        bike.customer.email,
        bike.customer.address
      ),
      bike.kilometers,
      new BikeModelEntity(bike.bikeModel.id, bike.bikeModel.name),
      bike.status,
      bike.circulationDate
    ));
  }

  async getById(id: number): Promise<Bike> {
    const bike = await BikeModel.findByPk(id, {
      include: [
        { model: CustomerModel, as: 'customer', include: [{ model: DrivingLicenseModel, as: 'drivingLicense' }] },
        { model: BikeModelModel, as: 'bikeModel' },
      ],
    });

    if (!bike) {
      throw new Error('Bike not found');
    }

    return new Bike(
      bike.id,
      new Customer(
        bike.customer.id,
        new DrivingLicense(
          bike.customer.drivingLicense.id,
          bike.customer.drivingLicense.emissionDate,
          this.mapStatus(bike.customer.drivingLicense.status),
          bike.customer.drivingLicense.country
        ),
        bike.customer.occupation,
        bike.customer.lastName,
        bike.customer.firstName,
        bike.customer.email,
        bike.customer.address
      ),
      bike.kilometers,
      new BikeModelEntity(bike.bikeModel.id, bike.bikeModel.name),
      bike.status,
      bike.circulationDate
    );
  }

  async search(keyword: string): Promise<Bike[]> {
    const bikes = await BikeModel.findAll({
      where: {
        status: {
          [Op.iLike]: `%${keyword}%`,
        },
      },
      include: [
        { model: CustomerModel, as: 'customer', include: [{ model: DrivingLicenseModel, as: 'drivingLicense' }] },
        { model: BikeModelModel, as: 'bikeModel' },
      ],
    });

    return bikes.map((bike) => new Bike(
      bike.id,
      new Customer(
        bike.customer.id,
        new DrivingLicense(
          bike.customer.drivingLicense.id,
          bike.customer.drivingLicense.emissionDate,
          this.mapStatus(bike.customer.drivingLicense.status),
          bike.customer.drivingLicense.country
        ),
        bike.customer.occupation,
        bike.customer.lastName,
        bike.customer.firstName,
        bike.customer.email,
        bike.customer.address
      ),
      bike.kilometers,
      new BikeModelEntity(bike.bikeModel.id, bike.bikeModel.name),
      bike.status,
      bike.circulationDate
    ));
  }

  private mapStatus(status: number): PermisStatus {
    switch (status) {
      case 1:
        return 'VALID';
      case 2:
        return 'EXPIRED';
      case 3:
        return 'SUSPENDED';
      default:
        throw new Error('Invalid driving license status');
    }
  }
}
