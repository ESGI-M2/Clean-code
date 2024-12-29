import { Trial } from '@triumph/domain/entity/trial';

export default interface TrialRepositoryWriter {
  add(trial: Trial): Promise<Trial>;
}