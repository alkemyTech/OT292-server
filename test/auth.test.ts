import chai, { expect } from 'chai';
import chaiHttp = require('chai-http');
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import db from '../src/models';
import app from '../src/app';

config();
chai.use(chaiHttp);

describe('Auth controller test', () => {
  before(async () => {
    await db.sequelize.sync({ force: true });
  });

  describe('POST /auth/register', () => {
    describe('Validation tests', () => {
      it('should return 400 if email is not provided', async () => {
        const res = await chai.request(app).post('/auth/register').send({
          firstName: 'John',
          lastName: 'Doe',
          password: '123456',
        });

        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('errors');
        expect(res.body.errors).to.be.an('array');
        expect(res.body.errors).to.have.lengthOf(2);
        expect(res.body.errors[0]).to.deep.equal({
          msg: 'Email cannot be empty',
          param: 'email',
          location: 'body',
        });
      });
      it('should return 400 if email is invalid', async () => {
        const res = await chai.request(app).post('/auth/register').send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'invalid',
          password: '123456',
        });

        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('errors');
        expect(res.body.errors).to.be.an('array');
        expect(res.body.errors).to.have.lengthOf(1);
        expect(res.body.errors[0]).to.deep.equal({
          value: 'invalid',
          msg: 'Must be a valid email',
          param: 'email',
          location: 'body',
        });
      });
      it('should return 400 if password is not provided', async () => {
        const res = await chai.request(app).post('/auth/register').send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'asd@asd.asd',
        });
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('errors');
        expect(res.body.errors).to.be.an('array');
        expect(res.body.errors).to.have.lengthOf(2);
        expect(res.body.errors[0]).to.deep.equal({
          msg: 'Cannot be empty',
          param: 'password',
          location: 'body',
        });
      });
      it('should return 400 if password is too short', async () => {
        const res = await chai.request(app).post('/auth/register').send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'asd@asd.asd',
          password: '1',
        });
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('errors');
        expect(res.body.errors).to.be.an('array');
        expect(res.body.errors).to.have.lengthOf(1);
        expect(res.body.errors[0]).to.deep.equal({
          value: '1',
          msg: 'Min 6 characters',
          param: 'password',
          location: 'body',
        });
      });
      it('should return 400 if firstName is not provided', async () => {
        const res = await chai.request(app).post('/auth/register').send({
          lastName: 'Doe',
          email: 'asd@asd.asd',
          password: '123456',
        });
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('errors');
        expect(res.body.errors).to.be.an('array');
        expect(res.body.errors).to.have.lengthOf(1);
        expect(res.body.errors[0]).to.deep.equal({
          msg: 'First name cannot be empty',
          param: 'firstName',
          location: 'body',
        });
      });
      it('should return 400 if lastName is not provided', async () => {
        const res = await chai.request(app).post('/auth/register').send({
          firstName: 'Doe',
          email: 'asd@asd.asd',
          password: '123456',
        });
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('errors');
        expect(res.body.errors).to.be.an('array');
        expect(res.body.errors).to.have.lengthOf(1);
        expect(res.body.errors[0]).to.deep.equal({
          msg: 'Last name cannot be empty',
          param: 'lastName',
          location: 'body',
        });
      });
    });

    it('Should return the created user', async () => {
      const res = await chai.request(app).post('/auth/register').send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'asd@asd.asd',
        password: '123456',
      });

      expect(res.status).to.equal(201);
      expect(res.body.status).to.equal(201);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.have.property('email').that.equal('asd@asd.asd');
    });
    it('should return 409 if email is already taken', async () => {
      await db.User.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'used@used.used',
        password: '123456',
      });
      const res = await chai.request(app).post('/auth/register').send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'used@used.used',
        password: '123456',
      });

      expect(res.status).to.equal(409);
      expect(res.body.status).to.equal(409);
      expect(res.body).to.have.property('errors');
      expect(res.body.errors).to.be.an('array');
      expect(res.body.errors).to.have.lengthOf(1);
      expect(res.body.errors[0]).to.deep.equal({
        value: 'used@used.used',
        msg: 'Email already in use',
      });
    });
  });

  describe('POST /auth/login', () => {
    describe('Validation tests', () => {
      it('should return 400 if email is not provided', async () => {
        const res = await chai.request(app).post('/auth/login').send({
          password: '123456',
        });

        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('errors');
        expect(res.body.errors).to.be.an('array');
        expect(res.body.errors).to.have.lengthOf(2);
        expect(res.body.errors[0]).to.deep.equal({
          msg: 'Cannot be empty',
          param: 'email',
          location: 'body',
        });
      });
      it('should return 400 if email is invalid', async () => {
        const res = await chai.request(app).post('/auth/login').send({
          email: 'invalid',
          password: '123456',
        });

        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('errors');
        expect(res.body.errors).to.be.an('array');
        expect(res.body.errors).to.have.lengthOf(1);
        expect(res.body.errors[0]).to.deep.equal({
          value: 'invalid',
          msg: 'Must be a valid email',
          param: 'email',
          location: 'body',
        });
      });
      it('should return 400 if password is not provided', async () => {
        const res = await chai.request(app).post('/auth/login').send({
          email: 'asd2@asd.asd',
        });
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('errors');
        expect(res.body.errors).to.be.an('array');
        expect(res.body.errors).to.have.lengthOf(1);
        expect(res.body.errors[0]).to.deep.equal({
          msg: 'Cannot be empty',
          param: 'password',
          location: 'body',
        });
      });
    });

    it('should return 401 if email is not found', async () => {
      const res = await chai.request(app).post('/auth/login').send({
        email: 'asag@aasf.asfasf',
        password: '123456',
      });
      expect(res.status).to.equal(401);
      expect(res.body.status).to.equal(401);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.equal('Invalid credentials');
    });
    it('should return 401 if password is incorrect', async () => {
      await db.User.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'asdd@asd.asd',
        password: bcrypt.hashSync('123456', 10),
      });
      const res = await chai.request(app).post('/auth/login').send({
        email: 'asdd@asd.asd',
        password: '1234567',
      });
      expect(res.status).to.equal(401);
      expect(res.body.status).to.equal(401);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.equal('Invalid credentials');
    });
    it('should return the generated token', async () => {
      const createdUser = await db.User.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'nuevo@nuevo.com',
        password: bcrypt.hashSync('123456', 10),
      });
      const res = await chai.request(app).post('/auth/login').send({
        email: 'nuevo@nuevo.com',
        password: '123456',
      });
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal(200);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.have.property('token').that.is.a('string');
      const payload = jwt.verify(res.body.message.token, process.env.JWT_SECRET!);
      expect(payload).to.have.property('id').that.equal(createdUser.id);
    });
  });
});
