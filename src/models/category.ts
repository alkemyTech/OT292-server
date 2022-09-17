
import {Model,InferAttributes,DataTypes,InferCreationAttributes, CreationOptional, Sequelize} from 'sequelize';
const sequelize = new Sequelize(process.env.DB_HOST || '127.0.0.1');

class Category extends Model <InferAttributes<Category>, InferCreationAttributes<Category>>  {
  declare id : CreationOptional<number>;
  declare name:string;
  declare description:string | null;
  declare image:string | null;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
  declare deleted_at: CreationOptional<Date> | null;
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
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
  deleted_at: DataTypes.DATE,
}, {
  sequelize,
  paranoid: true,
  timestamps: true,
  tableName: 'Categories',
  modelName: 'Category',
  underscored: true,
});

export default Category