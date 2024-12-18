import { Occupation } from '@triumph/domain/entity/occupation';

export default abstract class OccupationRepositoryWriter {
  abstract add(occupation: Occupation): Promise<Occupation>;
 // abstract edit(occupation: Occupation): Promise<Occupation>;
 //* abstract delete(occupation: number): Promise<void>;*/
}
