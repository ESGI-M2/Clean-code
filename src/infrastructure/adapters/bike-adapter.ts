import { Bike } from '@triumph/domain/entity/bike';
import BikeModel from '@triumph/sequelize-adapter/src/models/bike.model'; // Votre modèle Sequelize
import { toDomainCustomer } from './customer-adapter'; // Adaptateur pour le `Customer`

export function toDomainBike(bikeModel: BikeModel): Bike {
  const customer = toDomainCustomer(bikeModel.customer);  

  return new Bike(
    bikeModel.id,                      // ID du vélo
    customer,                           // Customer associé
    bikeModel.kilometers,               // Kilomètres du vélo
    bikeModel.bikeModel,                // Le modèle de vélo directement, pas besoin d'adaptateur supplémentaire
    bikeModel.status,                   // Statut du vélo
    bikeModel.circulationDate           // Date de circulation
  );
}
