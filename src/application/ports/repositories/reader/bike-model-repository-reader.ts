import { BikeModel } from '@triumph/domain/entity/bike-model';

export default abstract class BikeModelRepositoryReader {
  abstract list(): Promise<BikeModel[]>;
    abstract getById(id: number): Promise<BikeModel>;
    abstract search(keyword: string): Promise<BikeModel[]>;
}
