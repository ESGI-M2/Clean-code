import {
    Column,
    Table,
    Model,
    ForeignKey,
    BelongsTo,
  } from 'sequelize-typescript';
  import Bike from './bike.model';
  
  @Table({
    tableName: 'trials',
    modelName: 'Trial',
    timestamps: false,
    underscored: true,
  })
  export default class Trial extends Model {
    @Column({
      primaryKey: true,
      autoIncrement: true,
    })
    declare id: number;
  
    @ForeignKey(() => Bike)
    @Column
    declare bikeId: number;
  
    @BelongsTo(() => Bike)
    declare bike: Bike;
  
    @Column
    declare startDate: Date;
  
    @Column
    declare endDate: Date;
  
    @Column
    declare kilometers: number;
  }
  