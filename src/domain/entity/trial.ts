import { Bike } from './bike';

export class Trial {
  constructor(
    public id: number,
    public bike: Bike,
    public startDate: Date,
    public endDate: Date,
    public kilometers: number,
  ) {}
}
