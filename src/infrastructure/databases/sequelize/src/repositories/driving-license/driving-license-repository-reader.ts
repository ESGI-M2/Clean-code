import { DrivingLicense } from '@triumph/domain/entity/driving-license';
import DrivingLicenseModel from '../../models/driving-licence.model';
import { Op } from 'sequelize';
import DrivingLicenseRepositoryReader from '@triumph/application/ports/repositories/reader/driving-license-repository-reader';

export default class SequelizeDrivingLicenseRepositoryReader implements DrivingLicenseRepositoryReader {

  async list(): Promise<DrivingLicense[]> {
    const licenses = await DrivingLicenseModel.findAll();

    return licenses.map(license =>
      new DrivingLicense(
        license.id,
        license.emissionDate,
        this.mapStatus(license.status),
        license.country
      )
    );
  }

  async getById(licenseId: number): Promise<DrivingLicense> {
    const license = await DrivingLicenseModel.findByPk(licenseId);

    if (!license) {
      throw new Error(`Driving license with ID ${licenseId} not found`);
    }

    return new DrivingLicense(
      license.id,
      license.emissionDate,
      this.mapStatus(license.status),
      license.country
    );
  }

  async search(keyword: string): Promise<DrivingLicense[]> {
    const licenses = await DrivingLicenseModel.findAll({
      where: {
        [Op.or]: [
          { status: { [Op.iLike]: `%${keyword}%` } },
          { country: { [Op.iLike]: `%${keyword}%` } },
        ],
      },
    });

    return licenses.map(license =>
      new DrivingLicense(
        license.id,
        license.emissionDate,
        this.mapStatus(license.status),
        license.country
      )
    );
  }

  private mapStatus(status: number): 'VALID' | 'EXPIRED' | 'SUSPENDED' {
    switch (status) {
      case 0:
        return 'VALID';
      case 1:
        return 'EXPIRED';
      case 2:
        return 'SUSPENDED';
      default:
        throw new Error('Invalid status value');
    }
  }
}
