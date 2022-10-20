import { QueryInterface, Sequelize } from 'sequelize';
import { faker } from '@faker-js/faker';

const createRandomCategory : Function = () : Object => ({
  name: faker.commerce.product(),
  description: faker.commerce.productDescription(),
  image: faker.image.imageUrl(),
  created_at: faker.date.past(1, new Date()),
  updated_at: faker.date.past(3, new Date()),
});

const fillCategory : Function = (n:number) : Object[] => {
  const activities : Object[] = [];
  Array.from({ length: n }).forEach(() => activities.push(createRandomCategory()));
  return activities;
};

const categories = fillCategory(50);

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    await queryInterface.bulkInsert('Categories', categories, {});
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
