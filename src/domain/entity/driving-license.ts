export type PermisStatus = 'VALID' | 'EXPIRED' | 'SUSPENDED';

export class DrivingLicense {
  constructor(
    public id: number,
    public date: Date,
    public status: PermisStatus,
    public country: string,
  ) {
  }
}
