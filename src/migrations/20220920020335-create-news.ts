import sequelize, { DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface : sequelize.QueryInterface, Sequelize: sequelize.Sequelize) {
    await queryInterface.createTable('News', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'categories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
      deleted_at: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface: sequelize.QueryInterface, Sequelize: sequelize.Sequelize) {
    await queryInterface.dropTable('News');
  },
};
