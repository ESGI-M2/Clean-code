import { PermisStatus } from '@triumph/domain/entity/driving-license';

export default class CreateDrivingLicenseCommand {
  constructor(
    public date: Date,
    public status: PermisStatus,
    public country: string,
  ) {}
}
