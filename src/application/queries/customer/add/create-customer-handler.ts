import { Customer } from '@triumph/domain/entity/customer';
import CustomerRepositoryWriter from '@triumph/application/ports/repositories/writer/customer-repository-writer';
import CreateCustomerCommand from './create-customer-command';
import DrivingLicenseRepositoryReader from '@triumph/application/ports/repositories/reader/driving-license-repository-reader';
import OccupationRepositoryReader from '@triumph/application/ports/repositories/reader/occupation-repository-reader';

export default class CreateCustomerCommandHandler {
  constructor(
    private readonly customerRepositoryWriter: CustomerRepositoryWriter,
    private readonly drivingLicenseRepositoryReader: DrivingLicenseRepositoryReader,
    private readonly occupationRepositoryReader: OccupationRepositoryReader
  ) {}

  async execute(command: CreateCustomerCommand): Promise<Customer> {
    const drivingLicense = await this.drivingLicenseRepositoryReader.getById(command.drivingLicenseId)
      ;

    const occupation = await this.occupationRepositoryReader.getById(command.occupationId);

    if (!occupation) {
      throw new Error('Occupation not found');
    }

    const customer = new Customer(
      0, 
      drivingLicense,
      occupation,
      command.lastName,
      command.firstName,
      command.email,
      command.address
    );

    return await this.customerRepositoryWriter.add(customer);
  }
}
