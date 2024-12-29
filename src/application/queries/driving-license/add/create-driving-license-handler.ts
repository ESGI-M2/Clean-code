import { DrivingLicense } from '@triumph/domain/entity/driving-license';
import DrivingLicenseRepositoryWriter from '@triumph/application/ports/repositories/writer/driving-license-repository-writer';
import CreateDrivingLicenseCommand from './create-driving-license-command';

export default class CreateDrivingLicenseCommandHandler {
  constructor(
    private readonly drivingLicenseRepositoryWriter: DrivingLicenseRepositoryWriter
  ) {}

  async execute(command: CreateDrivingLicenseCommand): Promise<DrivingLicense> {
    const drivingLicense = new DrivingLicense(
      0,
      command.date,
      command.status,
      command.country
    );

    return await this.drivingLicenseRepositoryWriter.add(drivingLicense);
  }
}
