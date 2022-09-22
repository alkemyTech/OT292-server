'use strict';
import sequelize, { DataTypes } from 'sequelize';
module.exports = {
  async up(queryInterface: sequelize.QueryInterface, Sequelize: sequelize.Sequelize) {
    await queryInterface.createTable('Testimonials', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED
      },
      name: {
        type: DataTypes.STRING
      },
      image: {
        type: DataTypes.STRING
      },
      content: {
        type: DataTypes.STRING
      },
      created_At: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updated_At: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface: sequelize.QueryInterface, Sequelize: sequelize.Sequelize) {
    await queryInterface.dropTable('Testimonials');
  }
};