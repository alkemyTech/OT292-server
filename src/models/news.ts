import {
  CreationOptional, DataTypes as types, ForeignKey, InferAttributes,
  InferCreationAttributes, Model, Sequelize,
} from 'sequelize';
import { Category } from './category';

export class News extends Model<InferAttributes<News>, InferCreationAttributes<News>> {
  declare id: CreationOptional<Number>;
  declare name: string;
  declare content: string;
  declare image: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: Date | null;

  declare categoryId: ForeignKey<Category['id']>;
  declare type: string;

  static associate(models: any) {
    News.belongsTo(models.Category);
    News.hasMany(models.Comment);
  }
}

export default function initNewsModel(sequelize: Sequelize, DataTypes: typeof types) {
  News.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'categories',
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'News',
    tableName: 'news',
    underscored: true,
    timestamps: true,
    paranoid: true,
  });

  return News;
}
