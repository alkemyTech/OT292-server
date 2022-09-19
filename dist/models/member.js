"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(process.env.DB_URI || '');
class Member extends sequelize_1.Model {
}
Member.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    facebookUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    instagramUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    linkedinUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
    deletedAt: sequelize_1.DataTypes.DATE,
}, {
    sequelize,
    modelName: 'Member',
    tableName: 'members',
    timestamps: true,
    paranoid: true,
    underscored: true,
});
exports.default = Member;
//# sourceMappingURL=member.js.map