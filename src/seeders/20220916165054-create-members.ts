import { QueryInterface, Sequelize } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.bulkInsert('members', [{
      name: 'John Doe',
      facebook_Url: 'www.url.com',
      instagram_Url: 'www.url.com',
      linkedin_Url: 'www.url.com',
      image: 'www.url.com',
      description: 'lorem ipsum',
      created_At: new Date(),
      updated_At: new Date(),
      deleted_At: null,
    }], {});
  },

  async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
