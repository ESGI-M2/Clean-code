import { Trial } from '@triumph/domain/entity/trial';

export default abstract class TrialRepositoryReader {
  abstract list(): Promise<Trial[] | null>;
  abstract getById(trialId: number): Promise<Trial | null>;
  abstract search(keyword: string): Promise<Trial[]>;
}
