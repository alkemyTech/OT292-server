import sequelize, { DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface: sequelize.QueryInterface, Sequelize: sequelize.Sequelize) {
    await queryInterface.createTable('Contacts', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      created_At: DataTypes.DATE,
      updated_At: DataTypes.DATE,
      deleted_At: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface: sequelize.QueryInterface, Sequelize: sequelize.Sequelize) {
    await queryInterface.dropTable('Contacts');
  },
};
