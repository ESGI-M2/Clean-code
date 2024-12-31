import { Customer } from '@triumph/domain/entity/customer';
import CustomerModel from '../../models/customer.model';
import { Op } from 'sequelize';
import CustomerRepositoryReader from '@triumph/application/ports/repositories/reader/customer-repository-reader';
import { toDomainDrivingLicense } from '../../../../../adapters/driving-license-adapter';
import DrivingLicenseModel from '../../models/driving-licence.model';

export default class SequelizeCustomerRepositoryReader implements CustomerRepositoryReader {
  async list(): Promise<Customer[]> {
    const customers = await CustomerModel.findAll({
      include: [
        {
          model: DrivingLicenseModel,
          as: 'drivingLicense',
        },
      ],
    });

   ;

    return customers.map(customer =>
      new Customer(
        customer.id,
        customer.drivingLicense
        ? toDomainDrivingLicense(customer.drivingLicense)
        : null,
        customer.occupation,
        customer.lastName,
        customer.firstName,
        customer.email,
        customer.address
      )
    );
  }

  async getById(customerId: number): Promise<Customer | null> {
    const customer = await CustomerModel.findByPk(customerId, {
      include: ['drivingLicense'],
    });
    if (!customer) return null;

    return new Customer(
      customer.id,
      toDomainDrivingLicense(customer.drivingLicense),
      customer.occupation,
      customer.lastName,
      customer.firstName,
      customer.email,
      customer.address
    );
  }

  async search(keyword: string): Promise<Customer[]> {
    const customers = await CustomerModel.findAll({
      where: {
        [Op.or]: [
          { firstName: { [Op.iLike]: `%${keyword}%` } },
          { lastName: { [Op.iLike]: `%${keyword}%` } },
          { email: { [Op.iLike]: `%${keyword}%` } },
        ],
      },
      include: ['drivingLicense'],
    });

    return customers.map(customer =>
      new Customer(
        customer.id,
        toDomainDrivingLicense(customer.drivingLicense),
        customer.occupation,
        customer.lastName,
        customer.firstName,
        customer.email,
        customer.address
      )
    );
  }
}
