import { Customer } from '@triumph/domain/entity/customer';
import { toDomainDrivingLicense } from './driving-license-adapter';
import CustomerModel from '../databases/sequelize/src/models/customer.model';

export function toDomainCustomer(customerModel: CustomerModel): Customer {
  const drivingLicense = toDomainDrivingLicense(customerModel.drivingLicense);

  return new Customer(
    customerModel.id,
    drivingLicense,
    customerModel.occupation,
    customerModel.lastName,
    customerModel.firstName,
    customerModel.email,
    customerModel.address
  );
}
