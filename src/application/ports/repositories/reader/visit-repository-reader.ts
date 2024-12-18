import { Visit } from '@triumph/domain/entity/visit';

export default abstract class VisitRepositoryReader {
  abstract list(): Promise<Visit[] | null>;
  abstract getById(visitId: number): Promise<Visit | null>;
  abstract search(keyword: string): Promise<Visit[]>;
}
