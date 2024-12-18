import { Request, Response } from 'express';
import GetDrivingLicenseListQueryHandler from '@triumph/application/queries/driving-license/get/get-driving-license-list-query-handler';
import GetDrivingLicenseListQuery from '@triumph/application/queries/driving-license/get/get-driving-license-list-query';
import GetDrivingLicenseQueryHandler from '@triumph/application/queries/driving-license/get/get-driving-license-query-handler';
import SearchDrivingLicenseQueryHandler from '@triumph/application/queries/driving-license/filter/search-driving-license-query-handler';
import GetDrivingLicenseQuery from '@triumph/application/queries/driving-license/get/get-driving-license-query';
import SearchDrivingLicenseQuery from '@triumph/application/queries/driving-license/filter/search-driving-license-query';
import DrivingLicenseRepositoryReader from '@triumph/application/ports/repositories/reader/driving-license-repository-reader';

export default class DrivingLicenseController {
  constructor(
    private readonly DrivingLicenseRepositoryReader: DrivingLicenseRepositoryReader
  ) {}

  async list(req: Request, res: Response): Promise<Response> {
    const listDrivingLicenseUsecase = new GetDrivingLicenseListQueryHandler(this.DrivingLicenseRepositoryReader);
    const drivingLicenses = await listDrivingLicenseUsecase.execute(new GetDrivingLicenseListQuery());
    return res.status(200).json(drivingLicenses);
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    const getDrivingLicenseUsecase = new GetDrivingLicenseQueryHandler(this.DrivingLicenseRepositoryReader);
    const drivingLicense = await getDrivingLicenseUsecase.execute(new GetDrivingLicenseQuery(numericId));

    if (!drivingLicense) {
      return res.status(404).json({ message: 'DrivingLicense not found' });
    }

    return res.status(200).json(drivingLicense);
  }

  async search(req: Request, res: Response): Promise<Response> {
    const { keyword } = req.params;

    const searchDrivingLicenseUsecase = new SearchDrivingLicenseQueryHandler(this.DrivingLicenseRepositoryReader);
    const drivingLicenses = await searchDrivingLicenseUsecase.execute(new SearchDrivingLicenseQuery(keyword));

    return res.status(200).json(drivingLicenses);
  }
}
