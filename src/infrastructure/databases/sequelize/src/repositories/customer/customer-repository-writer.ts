import { Customer } from '@triumph/domain/entity/customer';
import CustomerModel from '../../models/customer.model';
import DrivingLicenseModel from '../../models/driving-licence.model';
import CustomerRepositoryWriter from '@triumph/application/ports/repositories/writer/customer-repository-writer';
import { toDomainDrivingLicense } from '../../../../../adapters/driving-license-adapter';

export default class SequelizeCustomerRepositoryWriter implements CustomerRepositoryWriter {
  async add(customer: Customer): Promise<Customer> {
    if (!customer.drivingLicense) {
      throw new Error('DrivingLicense is required for a Customer.');
    }

    const drivingLicense = await DrivingLicenseModel.findByPk(customer.drivingLicense.id);

    if (!drivingLicense) {
      throw new Error(`DrivingLicense with ID ${customer.drivingLicense.id} not found.`);
    }

    const customerModel = await CustomerModel.create({
      drivingLicenseId: drivingLicense.id,
      occupationId: customer.occupation?.id ?? null,
      lastName: customer.lastName,
      firstName: customer.firstName,
      email: customer.email,
      address: customer.address,
    });

    return new Customer(
      customerModel.id,
      toDomainDrivingLicense(drivingLicense),
      customer.occupation,
      customerModel.lastName,
      customerModel.firstName,
      customerModel.email,
      customerModel.address,
    );
  }

  async update(customer: Customer): Promise<Customer> {
    const existingCustomer = await CustomerModel.findByPk(customer.id);
    if (!existingCustomer) {
      throw new Error(`Customer with ID ${customer.id} not found.`);
    }

    if (!customer.drivingLicense) {
      throw new Error('DrivingLicense is required for a Customer.');
    }

    const drivingLicense = await DrivingLicenseModel.findByPk(customer.drivingLicense.id);

    if (!drivingLicense) {
      throw new Error(`DrivingLicense with ID ${customer.drivingLicense.id} not found.`);
    }

    await existingCustomer.update({
      drivingLicenseId: drivingLicense.id,
      occupationId: customer.occupation?.id ?? null,
      lastName: customer.lastName,
      firstName: customer.firstName,
      email: customer.email,
      address: customer.address,
    });

    return new Customer(
      existingCustomer.id,
      toDomainDrivingLicense(drivingLicense),
      customer.occupation,
      existingCustomer.lastName,
      existingCustomer.firstName,
      existingCustomer.email,
      existingCustomer.address,
    );
  }

  async delete(customerId: number): Promise<void> {
    const customer = await CustomerModel.findByPk(customerId);
    if (!customer) {
      throw new Error(`Customer with ID ${customerId} not found.`);
    }

    await customer.destroy();
  }
}
