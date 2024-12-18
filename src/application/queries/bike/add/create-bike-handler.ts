import { Bike } from '@triumph/domain/entity/bike';
import BikeRepositoryWriter from '../../../ports/repositories/writer/bike-repository-writer';
import CreateBikeCommand from './create-bike-command';
import CustomerRepositoryReader from '../../../ports/repositories/reader/customer-repository-reader'; // Ajouter le repository pour le Customer
import BikeModelRepositoryReader from '../../../ports/repositories/reader/bike-model-repository-reader'; // Ajouter le repository pour BikeModel

export default class CreateBikeCommandHandler {
  constructor(
    private readonly bikeRepositoryWriter: BikeRepositoryWriter,
    private readonly customerRepositoryReader: CustomerRepositoryReader,
    private readonly bikeModelRepositoryReader: BikeModelRepositoryReader
  ) {}

  async execute(command: CreateBikeCommand): Promise<Bike> {
    // Récupérer l'objet Customer à partir de l'ID
    const customer = await this.customerRepositoryReader.getById(command.customerId);
    if (!customer) {
      throw new Error('Customer not found');
    }

    // Récupérer l'objet BikeModel à partir de l'ID
    const bikeModel = await this.bikeModelRepositoryReader.getById(command.bikeModelId);
    if (!bikeModel) {
      throw new Error('Bike model not found');
    }

    // Créer le vélo avec l'objet Customer et BikeModel
    const bike = new Bike(
      0,
      customer,         // Passer l'objet Customer
      command.kilometers,
      bikeModel,        // Passer l'objet BikeModel
      command.status,
      command.circulationDate
    );

    // Ajouter le vélo en base
    return await this.bikeRepositoryWriter.add(bike);
  }
}
