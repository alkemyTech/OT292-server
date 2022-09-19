"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize, DataTypes) => {
    class User extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.belongsTo(models.Role, { as: 'role' });
        }
    }
    User.init({
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        image: DataTypes.STRING,
        password: DataTypes.STRING,
        roleId: DataTypes.INTEGER,
        deletedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};
//# sourceMappingURL=user.js.map