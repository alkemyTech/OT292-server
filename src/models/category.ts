import {
  CreationOptional, DataTypes as types, InferAttributes, InferCreationAttributes, Model, Sequelize,
} from 'sequelize';
export class Category extends Model <InferAttributes<Category>, InferCreationAttributes<Category>>  {
  declare id : CreationOptional<number>;
  declare name:string;
  declare description:string | null;
  declare image:string | null;

  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
  declare deleted_at: Date | null;

  static associate(models: any) {
    Category.hasOne(models.News);
  }
}
export default function initCategoryModel(sequelize: Sequelize, DataTypes: typeof types) {
Category.init({
  id: {
      type : DataTypes.INTEGER.UNSIGNED,
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
  modelName: 'Category',
  tableName: 'categories',
  paranoid: true,
  timestamps: true,
  underscored: true,
});
return Category;
}