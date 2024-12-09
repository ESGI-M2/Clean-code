import {
    Column,
    Table,
    Model,
  } from 'sequelize-typescript';
  
  @Table({
    tableName: 'events',
    modelName: 'Event',
    timestamps: false,
    underscored: true,
  })
  export default class Event extends Model {
    @Column({
      primaryKey: true,
      autoIncrement: true,
    })
    declare id: number;
  
    @Column
    declare name: string;
  }
  