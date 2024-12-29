import { DrivingLicense } from '@triumph/domain/entity/driving-license';

export default interface DrivingLicenseRepositoryWriter {
  add(drivingLicense: DrivingLicense): Promise<DrivingLicense>;
}
