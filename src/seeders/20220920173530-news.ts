import sequelize from 'sequelize';
import Category from '../models/category';

module.exports = {
  async up(queryInterface: sequelize.QueryInterface, Sequelize: sequelize.Sequelize) {
    await queryInterface.bulkInsert('news', [{
      name: 'Title example',
      content: 'Loram ipsum',
      image: 'www.anImageURL.com',
      category_id: 1,
      created_at: new Date(),
      updated_at: new Date(),

    }], {});
  },

  async down(queryInterface: sequelize.QueryInterface, Sequelize: sequelize.Sequelize) {
    //  await queryInterface.bulkDelete('News', null, {});
  },
};
