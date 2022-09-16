import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';

/*
id: INTEGER NOT NULL AUTO_INCREMENT
name: VARCHAR NOT NULL
content: TEXT NOT NULL
image: VARCHAR NOT NULL
timestamps y softDeletes
 */

const sequelizeInstance = new Sequelize(process.env.DATABASE_URI || '');

class Activity extends Model<InferAttributes<Activity>, InferCreationAttributes<Activity>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare content: string;
  declare image: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: Date | null;
}

Activity.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
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
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  sequelize: sequelizeInstance,
  timestamps: true,
  paranoid: true,
  modelName: 'Activity',
  underscored: true,
});

export default Activity;
