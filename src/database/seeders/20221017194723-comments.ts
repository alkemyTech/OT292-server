import { QueryInterface, Sequelize } from 'sequelize';
import { faker } from '@faker-js/faker';

const createRandomComment : Function = () : Object => ({
  user_id: faker.datatype.number({ min: 1, max: 4 }),
  new_id: faker.datatype.number({ min: 1, max: 4 }),
  body: faker.lorem.paragraph(),
  created_at: new Date(),
  updated_at: new Date(),
});

const fillTestimonials : Function = (n:number) : Object[] => {
  const activities : Object[] = [];
  Array.from({ length: n }).forEach(() => activities.push(createRandomComment()));
  return activities;
};

const testimonials = fillTestimonials(200);

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.bulkInsert('Comments', testimonials, {});
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
