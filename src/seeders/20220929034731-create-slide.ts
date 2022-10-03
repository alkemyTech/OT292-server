import {QueryInterface,Sequelize} from 'sequelize'

module.exports = {
  async up (queryInterface:QueryInterface, Sequelize:Sequelize) {
   await queryInterface.bulkInsert('Slides',[{
        image_Url : "image.png",
        text : "anything is what I will write here",
        order : 1,
        organization_Id : 1,
        created_at : new Date,
        updated_at : new Date
   }], {})
  },

  async down (queryInterface:QueryInterface, Sequelize : Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
