import { Customer } from './customer';
import { Event } from './event';

export class CustomerEvent {
  constructor(
    public id: number,
    public eventDate: Date,
    public description: string,
    public customer: Customer,
    public event: Event,
  ) {}
}
