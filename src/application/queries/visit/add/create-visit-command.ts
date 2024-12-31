export default class CreateVisitCommand {
  constructor(
    public bikeId: number,
    public visitDate: Date,
    public price: number,
    public recapitulation: string,
  ) {}
}
