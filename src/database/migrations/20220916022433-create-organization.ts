import sequelize, {
  DataTypes, INTEGER, STRING, DATE, BIGINT, TEXT,
} from 'sequelize';

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
      welcome_text: {
        type: TEXT,
        allowNull: false,
      },
      about_us_text: {
        type: TEXT,
        allowNull: true,
      },
      deleted_at: {
        type: DATE,
        allowNull: true,
      },
      facebook_url: {
        type: STRING,
        allowNull: true,
      },
      instagram_url: {
        type: STRING,
        allowNull: true,
      },
      linkedin_url: {
        type: STRING,
        allowNull: true,
      },
      created_at: DATE,
      updated_at: DATE,
    });
  },

  async down(queryInterface: sequelize.QueryInterface, Sequelize: sequelize.Sequelize) {
    await queryInterface.dropTable('Organizations');
  },
};
