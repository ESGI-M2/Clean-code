import { DrivingLicense } from '@triumph/domain/entity/driving-license';
import DrivingLicenseModel from '../../models/driving-licence.model';
import DrivingLicenseRepositoryWriter from '@triumph/application/ports/repositories/writer/driving-license-repository-writer';

const STATUS_MAP: Record<number, 'VALID' | 'EXPIRED' | 'SUSPENDED'> = {
  1: 'VALID',
  2: 'EXPIRED',
  3: 'SUSPENDED',
};

const STATUS_MAP_REVERSE: Record<'VALID' | 'EXPIRED' | 'SUSPENDED', number> = {
  VALID: 1,
  EXPIRED: 2,
  SUSPENDED: 3,
};

export default class SequelizeDrivingLicenseRepositoryWriter implements DrivingLicenseRepositoryWriter {
  async add(drivingLicense: DrivingLicense): Promise<DrivingLicense> {
    const statusNumber = STATUS_MAP_REVERSE[drivingLicense.status];
    if (statusNumber === undefined) {
      throw new Error(`Invalid status value: ${drivingLicense.status}`);
    }

    const drivingLicenseModel = await DrivingLicenseModel.create({
      emissionDate: drivingLicense.date,
      status: statusNumber,
      country: drivingLicense.country,
    });

    const domainStatus = STATUS_MAP[drivingLicenseModel.status];
    if (!domainStatus) {
      throw new Error(`Invalid status number from database: ${drivingLicenseModel.status}`);
    }

    return new DrivingLicense(
      drivingLicenseModel.id,
      drivingLicenseModel.emissionDate,
      domainStatus,
      drivingLicenseModel.country
    );
  }
}
