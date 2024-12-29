import { Bike } from '@triumph/domain/entity/bike';
import BikeRepositoryWriter from '../../../ports/repositories/writer/bike-repository-writer';
import CreateBikeCommand from './create-bike-command';
import CustomerRepositoryReader from '../../../ports/repositories/reader/customer-repository-reader';
import BikeModelRepositoryReader from '../../../ports/repositories/reader/bike-model-repository-reader';

export default class CreateBikeCommandHandler {
  constructor(
    private readonly bikeRepositoryWriter: BikeRepositoryWriter,
    private readonly customerRepositoryReader: CustomerRepositoryReader,
    private readonly bikeModelRepositoryReader: BikeModelRepositoryReader
  ) {}

  async execute(command: CreateBikeCommand): Promise<Bike> {
    const customer = await this.customerRepositoryReader.getById(command.customerId);
    if (!customer) {
      throw new Error('Customer not found');
    }

    const bikeModel = await this.bikeModelRepositoryReader.getById(command.bikeModelId);
    if (!bikeModel) {
      throw new Error('Bike model not found');
    }

    const bike = new Bike(
      0,
      customer,
      command.kilometers,
      bikeModel,
      command.status,
      command.circulationDate
    );

    return await this.bikeRepositoryWriter.add(bike);
  }
}
