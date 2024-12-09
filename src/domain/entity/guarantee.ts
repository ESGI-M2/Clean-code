import { Visit } from './visit';

export class Guarantee {
  constructor(
    public id: number,
    public visit: Visit,
    public startDate: Date,
    public endDate: Date,
    public type: string,
  ) {}
}
