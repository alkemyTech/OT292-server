import { DataTypes as types, Model, Sequelize } from 'sequelize';

export default (sequelize: Sequelize, DataTypes: typeof types) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }

  Role.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Role',
    paranoid: true,
  });
  return Role;
};
