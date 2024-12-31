import { Request, Response } from 'express';
import CreateDrivingLicenseCommandHandler from '@triumph/application/queries/driving-license/add/create-driving-license-handler';
import DrivingLicenseRepositoryWriter from '@triumph/application/ports/repositories/writer/driving-license-repository-writer';
import CreateDrivingLicenseCommand from '@triumph/application/queries/driving-license/add/create-driving-license-command';

export default class DrivingLicenseControllerWriter {
  constructor(
    private readonly DrivingLicenseRepositoryWriter: DrivingLicenseRepositoryWriter
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    const { date, status, country } = req.body;
    const createDrivingLicenseCommandHandler = new CreateDrivingLicenseCommandHandler(
      this.DrivingLicenseRepositoryWriter
    );

    try {
      const drivingLicense = await createDrivingLicenseCommandHandler.execute(new CreateDrivingLicenseCommand(
        date,
        status,
        country
      ));

      return res.status(201).json(drivingLicense);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur lors de la création du permis de conduire.' });
    }
  }
}
