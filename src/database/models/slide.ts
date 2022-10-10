import {
  CreationOptional, DataTypes as types, ForeignKey, InferAttributes, InferCreationAttributes,
  Model, Sequelize,
} from 'sequelize';
import { Organization } from './organization';

export class Slide extends Model<InferAttributes<Slide>, InferCreationAttributes<Slide>> {
  declare id: CreationOptional<Number>;
  declare imageUrl: string;
  declare text: string;
  declare order: number;
  declare organizationId: ForeignKey<Organization>;

  static associate(models: any) {
    Slide.belongsTo(models.Organization);
  }
}

export default function initSlideModel(sequelize: Sequelize, DataTypes: typeof types) {
  Slide.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    imageUrl: DataTypes.STRING,
    text: DataTypes.STRING,
    order: DataTypes.INTEGER,
    organizationId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Slide',
    timestamps: true,
    underscored: true,
  });
  return Slide;
}
