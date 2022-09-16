"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.createTable('Organizations', {
                id: {
                    type: sequelize_1.INTEGER.UNSIGNED,
                    autoIncrement: true,
                    primaryKey: true,
                },
                name: {
                    type: sequelize_1.STRING,
                    allowNull: false,
                },
                image: {
                    type: sequelize_1.STRING,
                    allowNull: false,
                },
                address: {
                    type: sequelize_1.STRING,
                    allowNull: true,
                },
                phone: {
                    type: sequelize_1.BIGINT.UNSIGNED,
                    allowNull: true,
                },
                email: {
                    type: sequelize_1.STRING,
                    allowNull: false,
                },
                welcomeText: {
                    type: sequelize_1.STRING,
                    allowNull: false,
                },
                aboutUsText: {
                    type: sequelize_1.STRING,
                    allowNull: true,
                },
                deletedAt: sequelize_1.DATE,
                createdAt: sequelize_1.DATE,
                updatedAt: sequelize_1.DATE,
            });
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.dropTable('Organizations');
        });
    },
};
//# sourceMappingURL=20220916022433-create-organization.js.map