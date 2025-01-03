import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import  CustomerService  from '../../modules/customer/customer-services';
import { DrivingLicense } from '@triumph/domain/entity/driving-license';
import { Occupation } from '@triumph/domain/entity/occupation';

@Controller('customers')
export class CustomerWriterController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async create(@Body() body: { 
    drivingLicenseId: number, 
    drivingLicenseDate: string, 
    occupationId: number, 
    lastName: string, 
    firstName: string, 
    email: string, 
    address: string 
  }, @Res() res: Response): Promise<Response> {
    const { drivingLicenseId, drivingLicenseDate, occupationId, lastName, firstName, email, address } = body;

    try {
      const drivingLicense = new DrivingLicense(drivingLicenseId, new Date(drivingLicenseDate), 'VALID', 'France');
      const occupation = new Occupation(occupationId, 'Software Developer');
      
      const customer = await this.customerService.createCustomer({
        id: 0,
        drivingLicense,
        occupation,
        lastName,
        firstName,
        email,
        address
      });

      return res.status(201).json(customer);
    } catch (error) {
      return res.status(500).json({ message: 'Erreur lors de la création du client', error });
    }
  }
}
