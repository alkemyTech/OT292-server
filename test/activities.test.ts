import chai, { expect } from 'chai';
import chaiHttp = require('chai-http');
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import db from '../src/models';
import app from '../src/app';

config();
chai.use(chaiHttp);

describe('Activities controller test', () => {
  const adminToken = jwt.sign({ id: 1 }, process.env.JWT_SECRET!);
  const userToken = jwt.sign({ id: 2 }, process.env.JWT_SECRET!);
  before(async () => {
    await db.sequelize.sync({ force: true });
    await db.Role.create({ name: 'admin', id: 1 });
    await db.Role.create({ name: 'user', id: 2 });
    await db.User.create({
      id: 1, firstName: 'John', lastName: 'Doe', email: 'asd', password: 'asd', roleId: 1,
    });
    await db.User.create({
      id: 2, firstName: 'John', lastName: 'Doe', email: 'asd2', password: 'asd', roleId: 2,
    });
  });
  beforeEach(async () => {
    await db.Activity.sync({ force: true });
  });

  describe('POST /activities', () => {
    describe('Validation tests', () => {
      it('should return 400 if name is not provided', async () => {
        const res = await chai.request(app).post('/activities').auth(adminToken, { type: 'bearer' }).send({
          content: 'content',
          image: 'image',
        });

        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('errors');
        expect(res.body.errors).to.be.an('array');
        expect(res.body.errors).to.have.lengthOf(2);
        expect(res.body.errors).to.deep.equal([
          'body[name]: Name cannot be empty',
          'body[name]: Name must be string',
        ]);
      });
      it('should return 400 if content is not provided', async () => {
        const res = await chai.request(app).post('/activities').auth(adminToken, { type: 'bearer' }).send({
          name: 'name',
          image: 'image',
        });

        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('errors');
        expect(res.body.errors).to.be.an('array');
        expect(res.body.errors).to.have.lengthOf(2);
        expect(res.body.errors).to.deep.equal([
          'body[content]: Content cannot be empty',
          'body[content]: Content must be string',
        ]);
      });
      it('should return 401 if user is not logged in', async () => {
        const res = await chai.request(app).post('/activities').send({
          name: 'name',
          content: 'content',
          image: 'image',
        });
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Unauthorized');
      });
      it('should return 403 if user is not admin', async () => {
        const res = await chai.request(app).post('/activities').auth(userToken, { type: 'bearer' }).send({
          name: 'name',
          content: 'content',
          image: 'image',
        });
        expect(res.status).to.equal(403);
        expect(res.body.status).to.equal(403);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Forbidden');
      });
    });

    it('should return the created activity', async () => {
      const res = await chai.request(app).post('/activities').auth(adminToken, { type: 'bearer' }).send({
        name: 'name',
        content: 'content',
      });
      expect(res.status).to.equal(201);
      expect(res.body.status).to.equal(201);
      expect(res.body).to.have.property('message').that.is.a('object');
      expect(res.body.message).to.have.property('id').that.equals(1);
    });
  });

  describe('PUT /activities', () => {
    beforeEach(async () => {
      await db.Activity.create({
        id: 1, name: 'name', content: 'content', image: 'image',
      });
    });

    describe('Validation tests', () => {
      it('should return 400 if id is invalid', async () => {
        const res = await chai.request(app).put('/activities/invalid').auth(adminToken, { type: 'bearer' }).send({
          name: 'name',
          content: 'content',
          image: 'image',
        });

        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('errors');
        expect(res.body.errors).to.be.an('array');
        expect(res.body.errors).to.have.lengthOf(1);
        expect(res.body.errors).to.deep.equal([
          'params[id]: ID must be an integer',
        ]);
      });
      it('should return 401 if user is not logged in', async () => {
        const res = await chai.request(app).put('/activities/1').send({
          name: 'name',
          content: 'content',
          image: 'image',
        });
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Unauthorized');
      });
      it('should return 403 if user is not admin', async () => {
        const res = await chai.request(app).put('/activities/1').auth(userToken, { type: 'bearer' }).send({
          name: 'name',
          content: 'content',
          image: 'image',
        });
        expect(res.status).to.equal(403);
        expect(res.body.status).to.equal(403);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Forbidden');
      });
    });

    it('should return the updated activity', async () => {
      const res = await chai.request(app).put('/activities/1').auth(adminToken, { type: 'bearer' }).send({
        name: 'updatedName',
      });

      const updatedActivity = await db.Activity.findOne({ where: { id: 1 } });

      expect(updatedActivity?.name).to.equal('updatedName');
      expect(updatedActivity?.content).to.equal('content');
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal(200);
      expect(res.body).to.have.property('message').that.is.a('object');
      expect(res.body.message).to.have.property('id').that.equals(1);
      expect(res.body.message).to.have.property('name').that.equals('updatedName');
      expect(res.body.message).to.have.property('updatedAt').that.does.not.equal(res.body.message.createdAt);
    });
  });
});
