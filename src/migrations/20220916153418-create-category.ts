import {QueryInterface, Sequelize, DataTypes} from 'sequelize';

module.exports = {
    async up(queryInterface:QueryInterface, Sequelize:Sequelize) {
    await queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE
      },
    });
  },
  async down(queryInterface:QueryInterface, Sequelize:Sequelize) {
    await queryInterface.dropTable('Categories');
  },
};