import { DrivingLicense } from '@triumph/domain/entity/driving-license';

import DrivingLicenseRepositoryReader from '../../../ports/repositories/reader/driving-license-repository-reader';
import GetDrivingLicenseListQuery from './get-driving-license-list-query';

export default class GetDrivingLicenseListQueryHandler {
  constructor(private readonly drivingLicenseRepositoryReader: DrivingLicenseRepositoryReader) {}

  async execute(query: GetDrivingLicenseListQuery): Promise<DrivingLicense[]> {
    return await this.drivingLicenseRepositoryReader.list();
  }
}
