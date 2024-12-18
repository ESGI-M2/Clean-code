import { Guarantee } from '@triumph/domain/entity/guarantee';

export default interface GuaranteeRepositoryReader {
  list(): Promise<Guarantee[]>;
  getById(id: number): Promise<Guarantee | null>;
  search(keyword: string): Promise<Guarantee[]>;
}
