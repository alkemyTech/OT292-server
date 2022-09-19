import {
  CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize,
} from 'sequelize';

const sequelize = new Sequelize(process.env.DB_URI || '');

class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string | null;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Role.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize,
  modelName: 'Role',
  tableName: 'roles',
  timestamps: true,
  paranoid: false,
  underscored: true,
});

export default Role;
