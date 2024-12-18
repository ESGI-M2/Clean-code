export default class SearchCustomerQuery {
  constructor(private readonly _keyword: string) {}

  get keyword(): string {
    return this._keyword;
  }
}
