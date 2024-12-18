import { Bike } from '@triumph/domain/entity/bike';
import BikeModel from '@triumph/sequelize-adapter/src/models/bike.model'; // Votre modèle Sequelize
import { toDomainCustomer } from './customer-adapter';  // Importez l'adaptateur pour `Customer`
import { toDomainBikeModel } from './bike-model-adapter'; // Si vous avez un adaptateur pour `BikeModel`

export function toDomainBikeModel(bikeModel: BikeModel): Bike {
  const customer = toDomainCustomer(bikeModel.customer);
  const bikeModelDomain = toDomainBikeModel(bikeModel.bikeModel);  // Adapter `bikeModel` en objet de domaine

  return new Bike(
    bikeModel.id,
    customer,
    bikeModel.kilometers,
    bikeModelDomain,
    bikeModel.status,
    bikeModel.circulationDate,
  );
}
