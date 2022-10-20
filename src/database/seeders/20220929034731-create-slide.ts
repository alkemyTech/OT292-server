import { QueryInterface, Sequelize } from 'sequelize';
import { faker } from '@faker-js/faker';

const createRandomSlides : Function = () : Object => ({
  image_Url: faker.image.imageUrl(),
  text: faker.random.words(10),
  order: faker.random.numeric(2),
  organization_Id: 1,
  created_at: faker.date.past(1, new Date()),
  updated_at: faker.date.past(1, new Date()),
});

const fillSlides : Function = (n:number) : Object[] => {
  const activities : Object[] = [];
  Array.from({ length: n }).forEach(() => activities.push(createRandomSlides()));
  return activities;
};

const slides = fillSlides(100);
module.exports = {
  async up(queryInterface:QueryInterface, Sequelize:Sequelize) {
    await queryInterface.bulkInsert('Slides', slides, {});
  },

  async down(queryInterface:QueryInterface, Sequelize : Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
