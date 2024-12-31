import { Column, Table, Model } from 'sequelize-typescript';

@Table({
  tableName: 'driving_licenses',
  modelName: 'DrivingLicense',
  timestamps: false,
  underscored: true,
})
export default class DrivingLicenseModel extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column
  declare emissionDate: Date;

  @Column
  declare status: number;

  @Column({
    validate: {
      len: [2, 2],
    },
  })
  declare country: string;
}
