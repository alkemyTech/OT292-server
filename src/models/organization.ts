import {
  CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize,
} from 'sequelize';

const sequelize = new Sequelize(process.env.DB_HOST || '127.0.0.1');

class Organization extends Model<InferAttributes<Organization>, InferCreationAttributes<Organization>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare image: string;
  declare address: string | null;
  declare phone: number | null;
  declare email: string;
  declare welcomeText: string;
  declare aboutUsText: string | null;
  declare deletedAt: CreationOptional<Date>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Organization.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  welcomeText: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  aboutUsText: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  deletedAt: DataTypes.DATE,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize,
  modelName: 'Organization',
  tableName: 'Organizations',
  timestamps: true,
  paranoid: true,
  underscored: true,
});

export default Organization;

