export default class GetOccupationQuery {
  constructor(private readonly _id: number) {}

  get id(): number {
    return this._id;
  }
}
