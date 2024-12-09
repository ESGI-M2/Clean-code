import { Bike } from './bike';

export class Visit {
  constructor(
    public id: number,
    public bike: Bike,
    public visitDate: Date,
    public price: number,
    public recapitulation: number,
  ) {}
}
