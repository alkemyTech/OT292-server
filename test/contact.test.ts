import chai, { expect } from 'chai';
import chaiHttp = require('chai-http');
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import { faker } from '@faker-js/faker';
import db from '../src/models';
import app from '../src/app';

config();
chai.use(chaiHttp);

function generateRandomContact(n: number) {
  const contacts = [];
  for (let i = 0; i < n; i += 1) {
    contacts.push({
      name: faker.name.firstName(),
      phone: faker.datatype.number({ min: 1000000, max: 9999999 }),
      email: faker.internet.email(),
      message: faker.lorem.sentence(),
    });
  }
  return contacts;
}

describe('Contact controller test', () => {
  const userToken = jwt.sign({ id: 1 }, process.env.JWT_SECRET!);
  const adminToken = jwt.sign({ id: 2 }, process.env.JWT_SECRET!);
  before(async () => {
    await db.sequelize.sync({ force: true });
    await db.Role.create({ name: 'user', id: 1 });
    await db.Role.create({ name: 'admin', id: 2 });
    await db.User.create({
      id: 1, firstName: 'John', lastName: 'Doe', email: 'asd', password: 'asd', roleId: 1,
    });
    await db.User.create({
      id: 2, firstName: 'asdasd', lastName: 'agd', email: 'fjfjffgj', password: 'sdfh', roleId: 2,
    });
  });

  describe('POST /contacts', () => {
    describe('Validation tests', () => {
      it('should return 401 if user is not logged in', async () => {
        const res = await chai.request(app).post('/contacts').send({
          name: 'John',
          phone: '123456',
          email: 'asd@asd.asd',
        });
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body).to.have.property('message').that.equals('Unauthorized');
      });
      it('should return 400 if email is not provided', async () => {
        const res = await chai.request(app).post('/contacts').auth(userToken, { type: 'bearer' }).send({
          name: 'John',
          message: 'loren ipsum',
          phone: '123456',
        });

        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('errors');
        expect(res.body.errors).to.be.an('array');
        expect(res.body.errors).to.have.lengthOf(1);
        expect(res.body.errors).to.deep.equal([
          'body[email]: Email cannot be empty',
        ]);
      });
      it('should return 400 if email is invalid', async () => {
        const res = await chai.request(app).post('/contacts').auth(userToken, { type: 'bearer' }).send({
          name: 'John',
          email: 'invalid',
          phone: '123456',
        });

        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('errors');
        expect(res.body.errors).to.be.an('array');
        expect(res.body.errors).to.have.lengthOf(1);
        expect(res.body.errors).to.deep.equal([
          'body[email]: Wrong email format',
        ]);
      });
      it('should return 400 if name is not provided', async () => {
        const res = await chai.request(app).post('/contacts').auth(userToken, { type: 'bearer' }).send({
          phone: '123456',
          email: 'asd@asd.asd',
        });

        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('errors');
        expect(res.body.errors).to.be.an('array');
        expect(res.body.errors).to.have.lengthOf(1);
        expect(res.body.errors).to.deep.equal([
          'body[name]: Name cannot be empty',
        ]);
      });
    });

    it('should respond with the created contact', async () => {
      const res = await chai.request(app).post('/contacts').auth(userToken, { type: 'bearer' }).send({
        name: 'John',
        phone: '123456',
        email: 'asd@asd.asd',
        message: 'loren ipsum',
      });

      expect(res.status).to.equal(201);
      expect(res.body.status).to.equal(201);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.be.an('object');
      expect(res.body.message).to.deep.include({
        name: 'John',
        phone: '123456',
        email: 'asd@asd.asd',
        message: 'loren ipsum',
      });
      const createdContact = await db.Contact.findOne({
        where: {
          id: res.body.message.id,
        },
      });
      expect(createdContact).to.be.an('object');
      expect(createdContact?.message).to.equal('loren ipsum');
    });
  });

  describe('GET /contacts', () => {
    let contacts: any[];
    before(async () => {
      await db.Contact.sync({ force: true });
      await db.Contact.bulkCreate(generateRandomContact(33));
      contacts = await db.Contact.findAll({ raw: true });
      for (let i = 0; i < contacts.length; i += 1) {
        contacts[i].createdAt = (new Date(contacts[i].createdAt)).toISOString();
        contacts[i].updatedAt = (new Date(contacts[i].updatedAt)).toISOString();
      }
    });

    describe('Validation tests', () => {
      it('should return 401 if user is not logged in', async () => {
        const res = await chai.request(app).get('/contacts');
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body).to.have.property('message').that.equals('Unauthorized');
      });
      it('should return 403 if user is not admin', async () => {
        const res = await chai.request(app).get('/contacts').auth(userToken, { type: 'bearer' });
        expect(res.status).to.equal(403);
        expect(res.body.status).to.equal(403);
        expect(res.body).to.have.property('message').that.equals('Forbidden');
      });
    });

    it('should return first 20 contacts if no query params are provided', async () => {
      const res = await chai.request(app).get('/contacts').auth(adminToken, { type: 'bearer' });
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal(200);
      expect(res.body).to.have.property('message');
      expect(res.body.message.contacts).to.be.an('array');
      expect(res.body.message.contacts).to.have.lengthOf(20);
      expect(res.body.message.contacts).to.deep.include.members(contacts.slice(0, 20));
    });

    it('should return the amount of contacts set in limit', async () => {
      const res = await chai.request(app).get('/contacts?limit=5').auth(adminToken, { type: 'bearer' });
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal(200);
      expect(res.body).to.have.property('message');
      expect(res.body.message.contacts).to.be.an('array');
      expect(res.body.message.contacts).to.have.lengthOf(5);
      expect(res.body.message.contacts).to.deep.include.members(contacts.slice(0, 5));
    });

    it('should return the contacts starting from the offset', async () => {
      const res = await chai.request(app).get('/contacts?offset=5').auth(adminToken, { type: 'bearer' });
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal(200);
      expect(res.body).to.have.property('message');
      expect(res.body.message.contacts).to.be.an('array');
      expect(res.body.message.contacts).to.have.lengthOf(20);
      expect(res.body.message.contacts).to.deep.include.members(contacts.slice(5, 25));
    });
  });
});
