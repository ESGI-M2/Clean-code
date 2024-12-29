import { Visit } from '@triumph/domain/entity/visit';

export default interface VisitRepositoryWriter {
  add(visit: Visit): Promise<Visit>;
}