'use strict';
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
            yield queryInterface.createTable('Testimonials', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: sequelize_1.DataTypes.INTEGER.UNSIGNED
                },
                name: {
                    type: sequelize_1.DataTypes.STRING
                },
                image: {
                    type: sequelize_1.DataTypes.STRING
                },
                content: {
                    type: sequelize_1.DataTypes.STRING
                },
                created_At: {
                    allowNull: false,
                    type: sequelize_1.DataTypes.DATE
                },
                updated_At: {
                    allowNull: false,
                    type: sequelize_1.DataTypes.DATE
                },
                deleted_At: {
                    type: sequelize_1.DataTypes.DATE
                }
            });
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.dropTable('Testimonials');
        });
    }
};
//# sourceMappingURL=20220917112740-create-testimonials.js.map