import { BikeModel } from '@triumph/domain/entity/bike-model';

export default abstract class BikeModelRepositoryWriter {
  abstract add(bikeModel: BikeModel): Promise<BikeModel>;
 /* abstract edit(bikeModel: BikeModel): Promise<BikeModel>;
  abstract delete(bikeModel: number): Promise<void>;*/
}
