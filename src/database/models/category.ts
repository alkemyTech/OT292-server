import {
  Model, InferAttributes, InferCreationAttributes, CreationOptional, Sequelize, DataTypes as types,
} from 'sequelize';

export class Category extends Model <InferAttributes<Category>, InferCreationAttributes<Category>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string | null;
  declare image: string | null;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: Date | null;

  static associate(models: any) {
    Category.hasMany(models.News);
  }
}

export default function initCategoryModel(sequelize: Sequelize, DataTypes: typeof types) {
  Category.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'Categories',
    paranoid: true,
    timestamps: true,
    underscored: true,
  });
  return Category;
}
