import { Sequelize, DataTypes, Options } from 'sequelize';
import initUserModel from './user';
import initActivityModel from './activity';
import initRoleModel from './role';
import initOrganizationModel from './organization';
import configFile from '../database/config/config';
import initCategoryModel from './category';
import initMemberModel from './member';
import initNewsModel from './news';
import initTestimonialsModel from './testimonials';
import initSlideModel from './slide';
import initContactModel from './contact';
import initCommentModel from './comment';

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
  Testimonial: initTestimonialsModel(sequelize, DataTypes),
  Slide: initSlideModel(sequelize, DataTypes),
  Contact: initContactModel(sequelize, DataTypes),
  Comment: initCommentModel(sequelize, DataTypes),
  sequelize,
};

db.Role.associate(db);
db.User.associate(db);
db.Slide.associate(db);
db.Organization.associate(db);

export default db;
