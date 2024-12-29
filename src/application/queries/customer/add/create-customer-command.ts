export default class CreateCustomerCommand {
  constructor(
    public drivingLicenseId: number,
    public occupationId: number,
    public lastName: string,
    public firstName: string,
    public email: string,
    public address: string,
  ) {}
}
