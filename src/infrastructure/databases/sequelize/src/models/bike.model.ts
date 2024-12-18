import { Column, Table, Model, CreatedAt, UpdatedAt, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import Customer from './customer.model';
import BikeModel from './bike-model.model';
import Trial from './trial.model';
import Visit from './visit.model';

@Table({
  tableName: 'bikes',
  modelName: 'Bike',
  timestamps: true,
  underscored: true,
})
export default class Bike extends Model {
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

  @ForeignKey(() => BikeModel)
  @Column
  declare bikeModelId: number;

  @BelongsTo(() => BikeModel)
  declare bikeModel: BikeModel;

  @Column
  declare kilometers: number;

  @Column
  declare status: number;

  @Column
  declare circulationDate: Date;

  @HasMany(() => Trial)
  declare trials: Trial[];

  @HasMany(() => Visit)
  declare visits: Visit[];

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
