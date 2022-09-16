"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(process.env.DB_HOST || '127.0.0.1');
class Organization extends sequelize_1.Model {
}
Organization.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    phone: {
        type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    welcomeText: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    aboutUsText: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    deletedAt: sequelize_1.DataTypes.DATE,
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    sequelize,
    modelName: 'Organization',
    tableName: 'Organizations',
    timestamps: true,
    paranoid: true,
    underscored: true,
});
exports.default = Organization;
//# sourceMappingURL=organization.js.map