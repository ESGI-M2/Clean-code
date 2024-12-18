import { Bike } from '@triumph/domain/entity/bike';

export default interface BikeRepositoryWriter {
  add(bike: Bike): Promise<Bike>;
}
