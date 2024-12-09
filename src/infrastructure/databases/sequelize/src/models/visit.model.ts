import {
    Column,
    Table,
    Model,
    ForeignKey,
    BelongsTo,
  } from 'sequelize-typescript';
  import Bike from './bike.model';
  
  @Table({
    tableName: 'visits',
    modelName: 'Visit',
    timestamps: false,
    underscored: true,
  })
  export default class Visit extends Model {
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
    declare visitDate: Date;
  
    @Column
    declare price: number;
  
    @Column
    declare recapitulation: number;
  }
  