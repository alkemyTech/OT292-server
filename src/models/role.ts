import {
  CreationOptional, DataTypes as types, InferAttributes, InferCreationAttributes, Model, Sequelize,
} from 'sequelize';

export class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string | null;

  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;

  static associate(models: any) {
    Role.hasMany(models.User);
  }
}

export default function initRoleModel(sequelize: Sequelize, DataTypes: typeof types) {
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
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'role',
    tableName: 'roles',
    timestamps: true,
    paranoid: false,
    underscored: true,
  });
  return Role;
}
