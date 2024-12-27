import { InvalidQueryError } from '../../invalid-query-error';
import { QueryValidator } from '../../query-validator';
import GetDealerByIdentifierQuery from './get-dealer-by-identifier-query';

export default class GetDealerByIdentifierQueryValidator implements QueryValidator {
  validateQuery(getDealerByIdentifierQuery: GetDealerByIdentifierQuery): void {
    const dealerId = getDealerByIdentifierQuery.id;

    if (!dealerId) {
      throw new InvalidQueryError();
    }
  }
}
