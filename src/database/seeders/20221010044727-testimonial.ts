import { QueryInterface, Sequelize } from 'sequelize';
import { faker } from '@faker-js/faker';

const createRandomTestiomonial : Function = () : Object => ({
  name: faker.name.fullName(),
  image: faker.image.imageUrl(),
  content: faker.lorem.sentence(),
  created_at: faker.date.past(1, new Date()),
  updated_at: faker.date.past(1, new Date()),
});

const fillTestimonials : Function = (n:number) : Object[] => {
  const activities : Object[] = [];
  Array.from({ length: n }).forEach(() => activities.push(createRandomTestiomonial()));
  return activities;
};

const testimonials = fillTestimonials(200);

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.bulkInsert('Testimonials', testimonials, {});
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
