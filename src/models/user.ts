import {
  Model, InferAttributes, InferCreationAttributes, CreationOptional, Sequelize,
  DataTypes as types, ForeignKey,
} from 'sequelize';
import { Role } from './role';

export class User extends Model <InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare password: string;
  declare photo: null | string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare roleId: ForeignKey<Role['id']>;

  static associate(models: any) {
    User.belongsTo(models.Role);
  }
}

export default function initUserModel(sequelize: Sequelize, DataTypes: typeof types) {
  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,

    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Date.now(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Date.now(),
    },
    roleId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'roles',
        key: 'id',
      },
    },

  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    paranoid: true,
    deletedAt: true,
    underscored: true,
    timestamps: true,
  });
  return User;
}
