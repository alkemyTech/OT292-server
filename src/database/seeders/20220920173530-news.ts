import { QueryInterface, Sequelize } from 'sequelize';
import { faker } from '@faker-js/faker';

const createRandomNews : Function = () : Object => ({
  name: faker.random.words(),
  content: faker.lorem.sentence(),
  image: faker.image.imageUrl(),
  category_id: 1,
  created_at: faker.date.past(1, new Date()),
  updated_at: faker.date.past(1, new Date()),
});

const fillNews : Function = (n:number) : Object[] => {
  const activities : Object[] = [];
  Array.from({ length: n }).forEach(() => activities.push(createRandomNews()));
  return activities;
};

const news = fillNews(200);
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.bulkInsert('news', news, {});
  },

  async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
    //  await queryInterface.bulkDelete('News', null, {});
  },
};
