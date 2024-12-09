import { Column, Table, Model, CreatedAt, UpdatedAt, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Occupation from './occupation.model';

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
