import { Customer } from './customer';
import { BikeModel } from './bike-model';

export class Bike {
  constructor(
    public id: number,
    public customer: Customer,
    public kilometers: number,
    public bikeModel: BikeModel,
    public status: number,
    public circulationDate: Date,
  ) {}
}
