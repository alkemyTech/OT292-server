
import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional} from 'sequelize';
const sequelize = new Sequelize(process.env.DB_URI || '');
  class Slide extends Model<InferAttributes<Slide>, InferCreationAttributes<Slide>> {
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
    timestamps:false,
    underscored:true
  });
  export default Slide;
