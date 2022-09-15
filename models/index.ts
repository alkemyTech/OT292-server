import fs from 'fs';
import path from 'path';
import sequelize, { Sequelize } from 'sequelize';

const basename = path.basename(__filename);
const config = require(`${__dirname}/../config/config`).development;
const db:any = {};

const sequelizeInstance = new sequelize.Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    // eslint-disable-next-line global-require
    const model = require(path.join(__dirname, file))(sequelizeInstance, sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
