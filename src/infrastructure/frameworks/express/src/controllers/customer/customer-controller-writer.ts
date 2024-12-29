import { Request, Response } from 'express';
import CreateCustomerCommandHandler from '@triumph/application/queries/customer/add/create-customer-handler';
import CustomerRepositoryWriter from '@triumph/application/ports/repositories/writer/customer-repository-writer';
import DrivingLicenseRepositoryReader from '@triumph/application/ports/repositories/reader/driving-license-repository-reader';
import OccupationRepositoryReader from '@triumph/application/ports/repositories/reader/occupation-repository-reader';
import CreateCustomerCommand from '@triumph/application/queries/customer/add/create-customer-command';

export default class CustomerControllerWriter {
  constructor(
    private readonly CustomerRepositoryWriter: CustomerRepositoryWriter,
    private readonly DrivingLicenseRepositoryReader: DrivingLicenseRepositoryReader,
    private readonly OccupationRepositoryReader: OccupationRepositoryReader
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    const { drivingLicenseId, occupationId, lastName, firstName, email, address } = req.body;

    const createCustomerCommandHandler = new CreateCustomerCommandHandler(
      this.CustomerRepositoryWriter,
      this.DrivingLicenseRepositoryReader,
      this.OccupationRepositoryReader
    );

    try {
      const createCustomerCommand = new CreateCustomerCommand(
        drivingLicenseId,
        occupationId,
        lastName,
        firstName,
        email,
        address
      );

      const customer = await createCustomerCommandHandler.execute(createCustomerCommand);

      return res.status(201).json(customer);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur lors de la création du client.' });
    }
  }
}
