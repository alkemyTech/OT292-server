"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sequelize_1 = __importStar(require("sequelize"));
const basename = path_1.default.basename(__filename);
const config = require(`${__dirname}/../config/config`).development;
const db = {};
const sequelizeInstance = new sequelize_1.default.Sequelize(config.database, config.username, config.password, config);
fs_1.default
    .readdirSync(__dirname)
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
    // eslint-disable-next-line global-require
    const model = require(path_1.default.join(__dirname, file))(sequelizeInstance, sequelize_1.default.DataTypes);
    db[model.name] = model;
});
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize_1.default;
db.Sequelize = sequelize_1.Sequelize;
exports.default = db;
//# sourceMappingURL=index.js.map