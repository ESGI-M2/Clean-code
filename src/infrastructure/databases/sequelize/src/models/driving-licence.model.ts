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
  declare emissionDate: Date;  // Vous avez utilisé 'emissionDate' au lieu de 'date'

  @Column
  declare status: number; // Vous utilisez un nombre pour le statut

  @Column
  declare country: string; // Code pays à deux caractères
}
