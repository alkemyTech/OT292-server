
import {
  CreationOptional, DataTypes as types, InferAttributes, InferCreationAttributes, Model, Sequelize,
} from 'sequelize';
  export class Slide extends Model<InferAttributes<Slide>, InferCreationAttributes<Slide>> {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    declare id: CreationOptional<Number>;
    declare imageUrl: string;
    declare text: string;
    declare order: number;
    declare organizationId: number;
    
    static associate(models:any) {
      // define association here
      Slide.belongsTo(models.Organization, {as: 'organization'});

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
    organizationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Slide',
    timestamps:true,
    underscored:true
  });
  return Slide;
}
