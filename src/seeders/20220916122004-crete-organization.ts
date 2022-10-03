import { QueryInterface, Sequelize } from 'sequelize';


module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    await queryInterface.bulkInsert('Organizations', [{
      name: 'myOrganization',
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      address: 'the doral',
      phone: 5111223344556,
      email: 'myorg@myorg.com',
      welcome_text: 'welcome to my organization',
      about_us_text: 'abouts us',
      facebook_url: 'SomosMás',
      linkedin_url: 'Somos_Más',
      instagram_url: 'Somos_Más',
      created_at: new Date,
      updated_at: new Date
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
