import { Customer } from './customer';
import { BikeModel } from './bike-model';

export class Bike {
  constructor(
    public id: number,
    public customer: Customer | null,
    public kilometers: number,
    public bikeModel: BikeModel | null,
    public status: number,
    public circulationDate: Date,
  ) {}
}
