import { DrivingLicense } from '@triumph/domain/entity/driving-license';

export default abstract class DrivingLicenseRepositoryReader {
  abstract list(): Promise<DrivingLicense[]>;
  abstract getById(id: number): Promise<DrivingLicense>;
  abstract search(keyword: string): Promise<DrivingLicense[]>;
}
