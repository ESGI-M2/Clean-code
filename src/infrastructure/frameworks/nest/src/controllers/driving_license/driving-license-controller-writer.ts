import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import  { DrivingLicenseService }  from '../../modules/driving_license/driving-license-services';

@Controller('drivinglicenses')
export class DrivingLicenseWriterController {
  constructor(private readonly drivingLicenseService: DrivingLicenseService) {}

  @Post()
  async create(@Body() body: any, @Res() res: Response) {
    const { date, status, country } = body;

    try {
      const drivingLicense = await this.drivingLicenseService.create({
        date,
        status,
        country,
      });

      return res.status(201).json(drivingLicense);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Erreur lors de la création du permis de conduire.',
      });
    }
  }
}
