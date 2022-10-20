import { QueryInterface, Sequelize } from 'sequelize';
import { faker } from '@faker-js/faker';

const createRandomMember : Function = () : Object => ({
  name: faker.name.fullName(),
  facebook_Url: faker.internet.url(),
  instagram_Url: faker.internet.url(),
  linkedin_Url: faker.internet.url(),
  image: faker.image.imageUrl(),
  description: faker.lorem.sentence(),
  created_at: faker.date.past(1, new Date()),
  updated_at: faker.date.past(3, new Date()),
});

const fillMembers : Function = (n:number) : Object[] => {
  const activities : Object[] = [];
  Array.from({ length: n }).forEach(() => activities.push(createRandomMember()));
  return activities;
};

const members = fillMembers(200);

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.bulkInsert('members', members, {});
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
