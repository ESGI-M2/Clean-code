import { Guarantee } from '@triumph/domain/entity/guarantee';

export default interface GuaranteeRepositoryWriter {
  add(guarantee: Guarantee): Promise<Guarantee>;
}