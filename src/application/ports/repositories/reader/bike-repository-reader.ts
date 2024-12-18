import { Bike } from '@triumph/domain/entity/bike';

export default abstract class BikeRepositoryReader {
  abstract list(): Promise<Bike[]>;
  abstract getById(id: number): Promise<Bike>;
  abstract search(keyword: string): Promise<Bike[]>;
}
