'use strict';
module.exports = {
  async up(queryInterface:any, Sequelize:any) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      roleId : {
        type : Sequelize.INTEGER,
        allowNull : false,
        references: {
            model: 'Role',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
      }
    });
  },
  async down(queryInterface:any, Sequelize:any) {
    await queryInterface.dropTable('Users');
  }
};