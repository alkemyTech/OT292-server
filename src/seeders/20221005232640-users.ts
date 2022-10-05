import sequelize from 'sequelize';

module.exports = {
  async up(queryInterface: sequelize.QueryInterface, Sequelize: sequelize.Sequelize) {
    const userId = (await queryInterface.rawSelect(
      'roles',
      {
        where: {
          name: 'user',
        },
      },
      ['id'],
    ));
    const adminId = (await queryInterface.rawSelect('roles', {
      where: {
        name: 'admin',
      },
    }, ['id']));

    const adminUsers = [{
      first_name: 'admin',
      last_name: 'admin',
      email: 'admin@admin.admin',
      password: 'admin',
      photo: 'admin',
      created_at: new Date(),
      updated_at: new Date(),
      role_Id: adminId,
    },
    {
      first_name: 'testAdmin',
      last_name: 'testAdmin',
      email: 'admin2@admin.admin',
      password: 'testAdmin',
      photo: 'testAdmin',
      created_at: new Date(),
      updated_at: new Date(),
      role_Id: adminId,
    }];
    const normalUsers = [{
      first_name: 'user',
      last_name: 'user',
      email: 'user@user.user',
      password: 'user',
      photo: 'user',
      created_at: new Date(),
      updated_at: new Date(),
      role_Id: userId,
    },
    {
      first_name: 'user2',
      last_name: 'user2',
      email: 'user2@user.user',
      password: 'user2',
      photo: 'user',
      created_at: new Date(),
      updated_at: new Date(),
      role_Id: userId,
    }];

    await queryInterface.bulkInsert('Users', adminUsers, {});
    await queryInterface.bulkInsert('Users', normalUsers, {});
  },

  async down(queryInterface: sequelize.QueryInterface, Sequelize: sequelize.Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
