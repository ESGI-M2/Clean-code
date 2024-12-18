import { Column, Table, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Customer from './customer.model';
import Event from './event.model';

@Table({
  tableName: 'customer_events',
  modelName: 'CustomerEvent',
  timestamps: false,
  underscored: true,
})
export default class CustomerEvent extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ForeignKey(() => Customer)
  @Column
  declare customerId: number;

  @BelongsTo(() => Customer)
  declare customer: Customer;

  @ForeignKey(() => Event)
  @Column
  declare eventId: number;

  @BelongsTo(() => Event)
  declare event: Event;

  @Column
  declare eventDate: Date;

  @Column
  declare description: string;
}
