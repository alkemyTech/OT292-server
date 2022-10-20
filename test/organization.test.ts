import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import db from '../src/models';
import app from '../src/app';
import { generateToken } from '../src/utils/jwt.handle';

chai.use(chaiHttp);

const org = {
  name: 'Somos mas',
  image: 'image.jpg',
  phone: 12323,
  email: 'somosfundacionmas@gmail.com',
  welcomeText: 'welcome to our onganization',
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

describe('Organization controllers test', () => {
  let adminToken: string;
  let userToken: string;
  before(async () => {
    await db.sequelize.sync({ force: true });
    await db.Organization.create(org);
    const roleAdmin = await db.Role.create({ name: 'admin' });
    const roleUser = await db.Role.create({ name: 'user' });
    const userAdmin = await db.User.create(Admin);
    const user = await db.User.create(User);
    adminToken = generateToken(userAdmin.id, roleAdmin.id);
    userToken = generateToken(user.id, roleUser.id);
  });

  describe('GET /organization/public', () => {
    it('Get organization', async () => {
      const res = await chai.request(app).get('/organization/public');

      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal(200);
      expect(res.body.message).to.be.an('object');
    });
  });

  describe('POST /organization/public', () => {
    it('Invalid token ', async () => {
      const res = await chai.request(app)
        .post('/organization/public')
        .send(org)
        .set('Authorization', 'Bearer 65656565sfsd');

      expect(res.status).to.equal(401);
    });
    it('No admin ', async () => {
      const res = await chai.request(app)
        .post('/organization/public')
        .set('Authorization', `Bearer ${userToken}`)
        .send(org);

      expect(res.status).to.equal(403);
    });
    it('Should return 400 if name is not provided', async () => {
      const res = await chai.request(app)
        .post('/organization/public')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          image: 'image.jpg',
          email: 'somosfundacionmas@gmail.com',
          phone: 12323,
          welcomeText: 'welcome to our onganization',
        });
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal(400);
      expect(res.body).to.have.property('errors');
      expect(res.body.errors).to.be.an('array');
      expect(res.body.errors).to.have.lengthOf(1);
      expect(res.body.errors).to.deep.equal([
        'body[name]: Organization name cannot be empty',
      ]);
    });
    it('Should return 400 if email is not provided', async () => {
      const res = await chai.request(app)
        .post('/organization/public')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Somos mas',
          image: 'image.jpg',
          phone: 12323,
          welcomeText: 'welcome to our onganization',
        });

      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal(400);
      expect(res.body).to.have.property('errors');
      expect(res.body.errors).to.be.an('array');
      expect(res.body.errors).to.have.lengthOf(2);
      expect(res.body.errors).to.deep.equal([
        'body[email]: Organization email cannot be empty',
        'body[email]: Must be a valid email',
      ]);
    });
    it('Should return 400 if email is invalid', async () => {
      const res = await chai.request(app)
        .post('/organization/public')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Somos mas',
          image: 'image.jpg',
          email: 'somosfundaciongmail.com',
          phone: 12323,
          welcomeText: 'welcome to our onganization',
        });

      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal(400);
      expect(res.body).to.have.property('errors');
      expect(res.body.errors).to.be.an('array');
      expect(res.body.errors).to.have.lengthOf(1);
      expect(res.body.errors).to.deep.equal([
        'body[email]: Must be a valid email',
      ]);
    });
    it('Should return 400 if phone is not numeric', async () => {
      const res = await chai.request(app)
        .post('/organization/public')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Somos mas',
          image: 'image.jpg',
          email: 'somosfundacion@gmail.com',
          phone: 'dfd12323',
          welcomeText: 'welcome to our organization',
        });

      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal(400);
      expect(res.body).to.have.property('errors');
      expect(res.body.errors).to.be.an('array');
      expect(res.body.errors).to.have.lengthOf(1);
      expect(res.body.errors).to.deep.equal([
        'body[phone]: Only numbers allowed',
      ]);
    });
    it('Should return a 200 update is successfully', async () => {
      const res = await chai.request(app)
        .post('/organization/public')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Somos mas',
          image: 'image.jpg',
          email: 'somosfundacion@hotmail.com',
          phone: 12323,
          welcomeText: 'welcome to our onganization',
        });

      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal(200);
      expect(res.body.message).to.be.an('object');
    });
  });
});
