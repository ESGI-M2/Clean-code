import { Column, Table, Model, CreatedAt, UpdatedAt, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Occupation from './occupation.model';
import DrivingLicense from './driving-licence.model';

@Table({
  tableName: 'customers',
  modelName: 'Customer',
  timestamps: true,
  underscored: true,
})
export default class Customer extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ForeignKey(() => Occupation)
  @Column
  declare occupationId: number;

  @BelongsTo(() => Occupation)
  declare occupation: Occupation;

  @ForeignKey(() => DrivingLicense)
  @Column
  declare drivingLicenseId: number;

  @BelongsTo(() => DrivingLicense)
  declare drivingLicense: DrivingLicense;

  @Column
  declare lastName: string;

  @Column
  declare firstName: string;

  @Column
  declare email: string;

  @Column
  declare address: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
