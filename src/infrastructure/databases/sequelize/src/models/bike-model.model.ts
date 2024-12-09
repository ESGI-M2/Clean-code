import {
    Column,
    Table,
    Model,
  } from 'sequelize-typescript';
  
  @Table({
    tableName: 'bike_models',
    modelName: 'BikeModel',
    timestamps: false,
    underscored: true,
  })
  export default class BikeModel extends Model {
    @Column({
      primaryKey: true,
      autoIncrement: true,
    })
    declare id: number;
  
    @Column
    declare name: string;
  }
  