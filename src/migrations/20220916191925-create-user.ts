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
      first_name: {
        type: Sequelize.STRING,
        allowNull : false
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull : false
      },
      email: {
        type: Sequelize.STRING,
        allowNull : false,
        unique : true
      },
      password: {
        type: Sequelize.STRING,
        allowNull : false
      },
      photo: {
        type: Sequelize.STRING,
        allowNull : false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      delete_at : {
        allowNull : false,
        type : Sequelize.DATE
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