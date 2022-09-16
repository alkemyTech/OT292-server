import { QueryInterface, Sequelize } from 'sequelize';


module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    await queryInterface.bulkInsert('Organizations', [{
      name: 'myOrganization',
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      address: 'the doral',
      phone: 5111223344556,
      email: 'myorg@myorg.com',
      welcomeText: 'welcome to my organization',
      aboutUsText: 'abouts us',
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
