export default class CreateTrialCommand {
  constructor(
    public bikeId: number,
    public startDate: Date,
    public endDate: Date,
    public kilometers: number,
  ) {}
}
