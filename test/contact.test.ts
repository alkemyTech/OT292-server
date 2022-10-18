import chai, { expect } from 'chai';
import chaiHttp = require('chai-http');
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../src/models';
import app from '../src/app';

config();
chai.use(chaiHttp);

describe('Contact controller test', () => {
  const userToken = jwt.sign({ id: 1 }, process.env.JWT_SECRET!);
  before(async () => {
    await db.sequelize.sync({ force: true });
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
});
