import sequelize, { DataTypes, INTEGER, STRING, DATE, BIGINT, TEXT} from 'sequelize';

module.exports = {
  async up(queryInterface: sequelize.QueryInterface, Sequelize: sequelize.Sequelize) {
    await queryInterface.createTable('Organizations', {
      id: {
        type: INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: STRING,
        allowNull: false,
      },
      image: {
        type: STRING,
        allowNull: false,
      },
      address: {
        type: STRING,
        allowNull: true,
      },
      phone: {
        type: BIGINT.UNSIGNED,
        allowNull: true,
      },
      email: {
        type: STRING,
        allowNull: false,
      },
      welcomeText: {
        type: TEXT,
        allowNull: false,
      },
      aboutUsText: {
        type: TEXT,
        allowNull: true,
      },
      deletedAt: {
        type: DATE,
        allowNull: true,
      },
      createdAt: DATE,
      updatedAt: DATE,
    });
  },

  async down(queryInterface: sequelize.QueryInterface, Sequelize: sequelize.Sequelize) {
    await queryInterface.dropTable('Organizations');
  },
}