import { DrivingLicense } from '@triumph/domain/entity/driving-license';
import DrivingLicenseModel from '../databases/sequelize/src/models/driving-licence.model';

function mapStatus(status: number): 'VALID' | 'EXPIRED' | 'SUSPENDED' {
  switch (status) {
    case 0:
      return 'VALID';
    case 1:
      return 'EXPIRED';
    case 2:
      return 'SUSPENDED';
    default:
      throw new Error('Invalid status code');
  }
}

export function toDomainDrivingLicense(drivingLicenseModel: DrivingLicenseModel): DrivingLicense {

  return new DrivingLicense(
    drivingLicenseModel.id,
    drivingLicenseModel.emissionDate,
    mapStatus(drivingLicenseModel.status),
    drivingLicenseModel.country
  );
}

