import DrivingLicenseRepositoryReader from '../../../ports/repositories/reader/driving-license-repository-reader';
import SearchDrivingLicenseQuery from './search-driving-license-query';
import { DrivingLicense } from '@triumph/domain/entity/driving-license';

export default class SearchDrivingLicenseQueryHandler {
  constructor(private readonly customerRepositoryReader: DrivingLicenseRepositoryReader) {}

  async execute(query: SearchDrivingLicenseQuery): Promise<DrivingLicense[]> {
    return this.customerRepositoryReader.search(query.keyword);
  }
}
