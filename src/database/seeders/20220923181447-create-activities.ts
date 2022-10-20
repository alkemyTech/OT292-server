import { QueryInterface, Sequelize } from 'sequelize';
import { faker } from '@faker-js/faker';

const createRandomActivity : Function = () : Object => ({
  name: faker.random.words(),
  content: faker.lorem.sentence(),
  image: faker.image.imageUrl(),
  created_at: faker.date.past(1, new Date()),
  updated_at: faker.date.past(1, new Date()),
});

const fillActivities : Function = (n:number) : Object[] => {
  const activities : Object[] = [];
  Array.from({ length: n }).forEach(() => activities.push(createRandomActivity()));
  return activities;
};

const activities = fillActivities(200);

module.exports = {
  async up(queryInterface: QueryInterface, sequelize: Sequelize) {
    await queryInterface.bulkInsert('activities', activities, {});
  },

  async down(queryInterface :QueryInterface, sequelize :Sequelize) {
    await queryInterface.bulkDelete('activities', {}, {});
  },
};
