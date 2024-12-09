import {
    Column,
    Table,
    Model,
    ForeignKey,
    BelongsTo,
  } from 'sequelize-typescript';
  import Visit from './visit.model';
  
  @Table({
    tableName: 'guarantees',
    modelName: 'Guarantee',
    timestamps: false,
    underscored: true,
  })
  export default class Garrantee extends Model {
    @Column({
      primaryKey: true,
      autoIncrement: true,
    })
    declare id: number;
  
    @ForeignKey(() => Visit)
    @Column
    declare visitId: number;
  
    @BelongsTo(() => Visit)
    declare visit: Visit;
  
    @Column
    declare startDate: Date;
  
    @Column
    declare endDate: Date;
  
    @Column
    declare type: string;
  }
  