import sequelize, { DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface : sequelize.QueryInterface, Sequelize: sequelize.Sequelize) {
    await queryInterface.createTable('Members', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
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
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface : sequelize.QueryInterface, Sequelize: sequelize.Sequelize) {
    await queryInterface.dropTable('Members');
  },
};
