import { Bike } from '@triumph/domain/entity/bike';
import BikeModel from '../../models/bike.model';
import BikeModelModel from '../../models/bike-model.model';
import CustomerModel from '../../models/customer.model';
import { toDomainCustomer } from '../../../../../adapters/customer-adapter';
import BikeRepositoryWriter from '@triumph/application/ports/repositories/writer/bike-repository-writer';
import { BikeModel as BikeModelDomain } from '@triumph/domain/entity/bike-model';

export default class SequelizeBikeRepositoryWriter implements BikeRepositoryWriter {
  async add(bike: Bike): Promise<Bike> {
    if (!bike.customer) {
      throw new Error('Customer is required to create a bike');
    }

    if (!bike.bikeModel) {
      throw new Error('BikeModel is required to create a bike');
    }

    const customerModel = await CustomerModel.findByPk(bike.customer.id);

    if (!customerModel) {
      throw new Error('Customer not found');
    }

    const customer = toDomainCustomer(customerModel);

    const bikeModelData = await BikeModelModel.findByPk(bike.bikeModel.id);
    if (!bikeModelData) {
      throw new Error('BikeModel not found');
    }

    const bikeModelDomain = new BikeModelDomain(
      bikeModelData.id,
      bikeModelData.name,
    );

    const bikeModel = await BikeModel.create({
      customerId: customer.id,
      bikeModelId: bike.bikeModel.id,
      kilometers: bike.kilometers,
      status: bike.status,
      circulationDate: bike.circulationDate
    });

    return new Bike(
      bikeModel.id,
      customer,
      bikeModel.kilometers,
      bikeModelDomain,
      bikeModel.status,
      bikeModel.circulationDate
    );
  }
}
