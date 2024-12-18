import { Occupation } from '@triumph/domain/entity/occupation';

export default abstract class OccupationRepositoryReader {
  abstract list(): Promise<Occupation[]>;
  abstract getById(id: number): Promise<Occupation>;
  abstract search(keyword: string): Promise<Occupation[]>;
}
