import { Occupation } from '@triumph/domain/entity/occupation';
import OccupationRepositoryReader from '@triumph/application/ports/repositories/reader/occupation-repository-reader';

/**
 * @deprecated
 *
 * InMemoryOccupationRepository is an implementation of the CustomerRepositoryReader
 *
 * This class is just used for testing purposes
 */
export default class InMemoryOccupationRepository implements OccupationRepositoryReader {
  private occupations: Occupation[] = [];

  constructor() {
    const mockOccupation1 = new Occupation(1, 'In MEMORY Software Engineer');

    const mockCustomer2 = new Occupation(2, 'In MEMORY Data Scientist');

    const mockCustomer3 = new Occupation(3, 'In MEMORY Product Manager');

    this.occupations.push(mockOccupation1);
    this.occupations.push(mockCustomer2);
    this.occupations.push(mockCustomer3);
  }
  search(keyword: string): Promise<Occupation[]> {
    throw new Error('Method not implemented.');
  }

  getById(id: number): Promise<Occupation> {
    throw new Error('Method not implemented.');
  }

  async list(): Promise<Occupation[]> {
    return Promise.resolve(this.occupations);
  }
}
