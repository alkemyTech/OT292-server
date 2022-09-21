import { QueryInterface, Sequelize} from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.bulkInsert('members', [{
      name: 'John Doe',
      facebookUrl: 'www.url.com',
      instagramUrl: 'www.url.com',
      linkedinUrl: 'www.url.com',
      image: 'www.url.com',
      description: 'lorem ipsum',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
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
