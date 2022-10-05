import sequelize, { DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface : sequelize.QueryInterface, Sequelize: sequelize.Sequelize) {
    await queryInterface.createTable('members', {
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

      facebook_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      instagram_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      linkedin_url: {

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

      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    });
  },
  async down(queryInterface : sequelize.QueryInterface, Sequelize: sequelize.Sequelize) {
    await queryInterface.dropTable('members');
  },
};
