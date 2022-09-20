import {
  CreationOptional, DataTypes, InferAttributes,
  InferCreationAttributes, Model, Sequelize,
} from 'sequelize';

const sequelizeInstance = new Sequelize(process.env.DATABASE_URI || '');

class News extends Model<InferAttributes<News>, InferCreationAttributes<News>> {
  declare id: CreationOptional<Number>;
  declare name: string;
  declare content: string;
  declare image: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: Date | null;

  declare categoryId: number | null;

  static associate(models: any) {
    News.belongsTo(models.Category, {
      foreignKey: 'category_id',
      targetKey: 'id',
      keyType: DataTypes.INTEGER,
      constraints: true,
    });
  }
}
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
  sequelize: sequelizeInstance,
  modelName: 'News',
  tableName: 'news',
  underscored: true,
  timestamps: true,
  paranoid: true,
});

export default News;
