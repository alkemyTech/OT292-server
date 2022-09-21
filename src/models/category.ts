
import {Model,InferAttributes,DataTypes,InferCreationAttributes, CreationOptional, Sequelize} from 'sequelize';
const sequelize = new Sequelize(process.env.DB_URI || '');

class Category extends Model <InferAttributes<Category>, InferCreationAttributes<Category>>  {
  declare id : CreationOptional<number>;
  declare name:string;
  declare description:string | null;
  declare image:string | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: Date | null;
}
Category.init({
  id: {
      type : DataTypes.INTEGER,
      allowNull : false,
      primaryKey : true,
      autoIncrement : true
  },
  name:{
    type : DataTypes.STRING,
    allowNull : false
  },
  description: {
    type : DataTypes.STRING,
    allowNull : true
  },
  image: {
    type : DataTypes.STRING,
    allowNull : true
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
  deletedAt: DataTypes.DATE,
}, {
  sequelize,
  paranoid: true,
  timestamps: true,
  tableName: 'categories',
  modelName: 'Category',
  underscored: true,
});

export default Category