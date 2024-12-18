import { DrivingLicense } from '@triumph/domain/entity/driving-license';
import DrivingLicenseRepositoryReader from '../../../ports/repositories/reader/driving-license-repository-reader';
import GetDrivingLicenseQuery from './get-driving-license-query';

export default class GetDrivingLicenseQueryHandler {
  constructor(private readonly drivingLicenseRepositoryReader: DrivingLicenseRepositoryReader) {}

  async execute(query: GetDrivingLicenseQuery): Promise<DrivingLicense | null> {
    return this.drivingLicenseRepositoryReader.getById(query.id);
  }
}
