export default class SearchOccupationQuery {
  constructor(private readonly _keyword: string) {}

  get keyword(): string {
    return this._keyword;
  }
}
