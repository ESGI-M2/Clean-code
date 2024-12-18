import { Column, Table, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import VisitModel from './visit.model';

@Table({
  tableName: 'guarantees',
  modelName: 'Guarantee',
  timestamps: false,
  underscored: true,
})
export default class GuaranteeModel extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ForeignKey(() => VisitModel)
  @Column
  declare visitId: number;

  @BelongsTo(() => VisitModel)
  declare visit: VisitModel;

  @Column
  declare startDate: Date;

  @Column
  declare endDate: Date;

  @Column
  declare type: string;
}
