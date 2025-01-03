import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import  { DrivingLicenseService }  from '../../modules/driving_license/driving-license-services';

@Controller('drivinglicenses')
export class DrivingLicenseController {
  constructor(private readonly drivingLicenseService: DrivingLicenseService) {}

  @Get()
  async list(@Res() res: Response) {
    const drivingLicenses = await this.drivingLicenseService.list();
    return res.status(200).json(drivingLicenses);
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Res() res: Response) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    const drivingLicense = await this.drivingLicenseService.getById(numericId);

    if (!drivingLicense) {
      return res.status(404).json({ message: 'DrivingLicense not found' });
    }

    return res.status(200).json(drivingLicense);
  }

  @Get('search/:keyword')
  async search(@Param('keyword') keyword: string, @Res() res: Response) {
    const drivingLicenses = await this.drivingLicenseService.search(keyword);
    return res.status(200).json(drivingLicenses);
  }
}
