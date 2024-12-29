export default class CreateGuaranteeCommand {
  constructor(
    public visitId: number,
    public startDate: Date,
    public endDate: Date,
    public type: string,
  ) {}
}
