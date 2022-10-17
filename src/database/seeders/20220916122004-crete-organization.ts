import { QueryInterface, Sequelize } from 'sequelize';
import { faker } from '@faker-js/faker';

const createRandomOrganization : Function = () : Object => ({
  name: faker.company.name(),
  image: faker.image.imageUrl(),
  address: faker.address.direction(),
  phone: faker.phone.number('##########'),
  email: faker.internet.exampleEmail(),
  welcome_text: faker.random.words(10),
  facebook_url: faker.internet.url(),
  linkedin_url: faker.internet.url(),
  instagram_url: faker.internet.url(),
  created_at: faker.date.past(1, new Date()),
  updated_at: faker.date.past(1, new Date()),
});

const fillOrganizations : Function = (n:number) : Object[] => {
  const activities : Object[] = [];
  Array.from({ length: n }).forEach(() => activities.push(createRandomOrganization()));
  return activities;
};

const organizations = fillOrganizations(100);
module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    await queryInterface.bulkInsert('Organizations', organizations, {});
  },

  down: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
