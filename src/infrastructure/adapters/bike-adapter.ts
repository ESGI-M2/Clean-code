import { Bike } from '@triumph/domain/entity/bike';
import BikeModel from '@triumph/sequelize-adapter/src/models/bike.model';
import { toDomainCustomer } from './customer-adapter';

export function toDomainBike(bikeModel: BikeModel): Bike {
  const customer = toDomainCustomer(bikeModel.customer);  

  return new Bike(
    bikeModel.id,
    customer,
    bikeModel.kilometers,
    bikeModel.bikeModel,
    bikeModel.status,
    bikeModel.circulationDate
  );
}
