import { Sequelize, DataTypes, Options } from 'sequelize';
import initUserModel from './user';
import initActivityModel from './activity';
import initRoleModel from './role';
import initOrganizationModel from './organization';
import configFile from '../config/config';

type EnvType = 'development' | 'test' | 'production';
const env: EnvType = process.env.NODE_ENV as EnvType || 'development';
const config: Options = configFile[env] as Options;

const sequelize = new Sequelize(config);
const db = {
  Activity: initActivityModel(sequelize, DataTypes),
  User: initUserModel(sequelize, DataTypes),
  Role: initRoleModel(sequelize, DataTypes),
  Organization: initOrganizationModel(sequelize, DataTypes),
};

db.Role.associate(db);
db.User.associate(db);

export default db;
