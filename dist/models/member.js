"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Member = void 0;
const sequelize_1 = require("sequelize");
class Member extends sequelize_1.Model {
}
exports.Member = Member;
function initUserModel(sequelize, DataTypes) {
    Member.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        facebookUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        instagramUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        linkedinUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'Member',
        tableName: 'members',
        timestamps: true,
        paranoid: true,
        underscored: true,
    });
    return Member;
}
exports.default = initUserModel;
;
//# sourceMappingURL=member.js.map