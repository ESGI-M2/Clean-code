import { Injectable, Inject } from '@nestjs/common';
import { Bike } from '@triumph/domain/entity/bike'; 
import BikeRepositoryWriter from '@triumph/application/ports/repositories/writer/bike-repository-writer';
import BikeRepositoryReader from '@triumph/application/ports/repositories/reader/bike-repository-reader';
import CustomerRepositoryReader from '@triumph/application/ports/repositories/reader/customer-repository-reader';
import BikeModelRepositoryReader from '@triumph/application/ports/repositories/reader/bike-model-repository-reader';

@Injectable()
export default class BikeService {
  constructor(
    @Inject('BikeRepositoryWriter') private readonly bikeRepositoryWriter: BikeRepositoryWriter,
    @Inject('BikeRepositoryReader') private readonly bikeRepositoryReader: BikeRepositoryReader,
    @Inject('CustomerRepositoryReader') private readonly customerRepositoryReader: CustomerRepositoryReader, 
    @Inject('BikeModelRepositoryReader') private readonly bikeModelRepositoryReader: BikeModelRepositoryReader,
  ) {}

  async createBike(bike: Bike): Promise<Bike> {
    return await this.bikeRepositoryWriter.add(bike);
  }

  async getBikeList(): Promise<Bike[]> {
    return await this.bikeRepositoryReader.list();
  }

  async getBikeById(id: number): Promise<Bike> {
    return await this.bikeRepositoryReader.getById(id);
  }

  async searchBike(keyword: string): Promise<Bike[]> {
    return await this.bikeRepositoryReader.search(keyword);
  }
}
