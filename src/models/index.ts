import { Sequelize, DataTypes, Options } from 'sequelize';
import initUserModel from './user';
import initActivityModel from './activity';
import initRoleModel from './role';
import initOrganizationModel from './organization';
import configFile from '../config/config';
import initCategoryModel from './category';
import initMemberModel from './member';
import initNewsModel from './news';
import initSlideModel from './slide';

type EnvType = 'development' | 'test' | 'production';
const env: EnvType = process.env.NODE_ENV as EnvType || 'development';
const config: Options = configFile[env] as Options;

const sequelize = new Sequelize(config);
const db = {
  Activity: initActivityModel(sequelize, DataTypes),
  User: initUserModel(sequelize, DataTypes),
  Role: initRoleModel(sequelize, DataTypes),
  Organization: initOrganizationModel(sequelize, DataTypes),
  Category: initCategoryModel(sequelize, DataTypes),
  Member: initMemberModel(sequelize, DataTypes),
  News: initNewsModel(sequelize, DataTypes),
  Slide: initSlideModel(sequelize, DataTypes),
};

db.Role.associate(db);
db.User.associate(db);

export default db;
