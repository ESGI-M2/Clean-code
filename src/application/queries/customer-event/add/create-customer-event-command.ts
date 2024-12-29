export default class CreateCustomerEventCommand {
  constructor(
    public customerId: number,
    public eventId: number,
    public eventDate: Date,
    public description: string
  ) {}
}
