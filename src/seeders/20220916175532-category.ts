import { QueryInterface, Sequelize } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    await queryInterface.bulkInsert('Categories', [{
      name: 'General',
      description: 'Categorias generales',
      image: 'https://fvja.files.wordpress.com/2021/06/cult-y-comunicacion.jpg',
      createdAt: new Date,
      updatedAt: new Date
    }], {});
  },

  down: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};