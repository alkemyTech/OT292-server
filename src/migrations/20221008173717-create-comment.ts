import sequelize, { DataTypes } from 'sequelize';

module.exports = {
  async up (queryInterface: sequelize.QueryInterface, Sequelize: sequelize.Sequelize)  {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id',
        }},
      new_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
        model: 'news',
        key: 'id',
          },
      },
      content: {
        type: DataTypes.TEXT
      },
      type: {
        type: DataTypes.STRING
      },
      created_at: {
        allowNull: true,
        type: DataTypes.DATE
      },
      updated_at: {
        allowNull: true,
        type: DataTypes.DATE
      },
    });
  },
  async down(queryInterface: sequelize.QueryInterface, Sequelize: sequelize.Sequelize) {
    await queryInterface.dropTable('Comments');
  }
};