export default class CreateBikeCommand {
  constructor(
    public customerId: number,
    public bikeModelId: number,
    public kilometers: number,
    public status: number,
    public circulationDate: Date
  ) {}
}
