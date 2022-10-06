import sequelize from 'sequelize';

module.exports = {
  async up(queryInterface: sequelize.QueryInterface, Sequelize: sequelize.Sequelize) {
    await queryInterface.bulkInsert('roles', [{
      name: 'admin',
      description: 'Administrator',
      created_At: new Date(),
      updated_At: new Date(),
    }, {
      name: 'user',
      description: 'User',
      created_At: new Date(),
      updated_At: new Date(),
    }]);
  },

  async down(queryInterface: sequelize.QueryInterface, Sequelize: sequelize.Sequelize) {
  },
};
