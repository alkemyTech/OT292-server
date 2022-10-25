import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import db from '../src/models';
import app from '../src/app';
import { generateToken } from '../src/utils/jwt.handle';

chai.use(chaiHttp);

const userTest = {
  firstName: 'elon',
  lastName: 'Musk',
  email: 'eySoyElon@gmail.com',

};

const Admin = {
  firstName: 'User',
  lastName: 'Admin',
  email: 'correo@correo.com',
  password: '123456',
  roleId: 1,
};

const User = {
  firstName: 'User',
  lastName: 'User',
  email: 'correo2@correo.com',
  password: '123456',
};

describe('Test User Controller', () => {
  let adminToken: string;
  let userToken: string;
  before(async () => {
    await db.sequelize.sync({ force: true });
    // @ts-ignore
    const roleUser = await db.Role.create({ name: 'admin' });
    const roleAdmin = await db.Role.create({ name: 'admin' });
    // @ts-ignore
    const user = await db.User.create(User);
    // @ts-ignore
    const userAdmin = await db.User.create(Admin);
    adminToken = generateToken(userAdmin.id, roleAdmin.id);
    userToken = generateToken(user.id, roleUser.id);
  });
  describe('Get User ', () => {
    it('Get /users Invalid Token', async () => {
      const res = await chai
        .request(app)
        .get('/users')
        .set('Authorization', 'Bearer xbxbbs201');
      expect(res.status).to.equal(401);
    });

    it('No Admin', async () => {
      const res = await chai
        .request(app)
        .get('/users')
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.status).to.equal(403);
    });

    it('Return 200 getAll User Successful', async () => {
      const res = await chai
        .request(app)
        .get('/users')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal(200);
      expect(res.body.message).to.be.an('array');
    });
  });

  describe('Update User', () => {
    it('update/users Invalid Token', async () => {
      const res = await chai
        .request(app)
        .patch('/users/1')
        .send(User)
        .set('Authorization', 'Bearer ey7d83ec20');
      expect(res.status).to.equal(401);
    });

    it('Update/User Not Found', async () => {
      const res = await chai
        .request(app)
        .patch('/users/4')
        .send(User)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).to.equal(404);
    });
  });

  describe('Delete User', () => {
    it('delete User 404 not Found', async () => {
      const res = await chai
        .request(app)
        .delete('/users/5');

      expect(res.status).to.equal(404);
    });
    it('delete/User Successful', async () => {
      const res = await chai
        .request(app)
        .delete('/users/1');

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.equal('User Deleted');
    });
  });
});
