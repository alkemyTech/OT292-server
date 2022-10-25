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
    await db.Organization.create({
      name: 'Test',
      email: 'org@org.org',
      phone: 123456789,
      welcomeText: 'Welcome to Test',
      address: 'Test address',
      image: 'https://www.test.com',
      facebookUrl: 'https://www.facebook.com',
      linkedinUrl: 'https://www.linkedin.com',
      instagramUrl: 'https://www.instagram.com',
    });
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
        expect(res.body.errors).to.deep.equal([
          'body[email]: Email cannot be empty',
          'body[email]: Must be a valid email',
        ]);
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
        expect(res.body.errors).to.deep.equal([
          'body[email]: Must be a valid email',
        ]);
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
        expect(res.body.errors).to.deep.equal([
          'body[password]: Cannot be empty',
          'body[password]: Min 6 characters',
        ]);
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
        expect(res.body.errors).to.deep.equal([
          'body[password]: Min 6 characters',
        ]);
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
        expect(res.body.errors).to.deep.equal([
          'body[firstName]: First name cannot be empty',
        ]);
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
        expect(res.body.errors).to.deep.equal([
          'body[lastName]: Last name cannot be empty',
        ]);
      });
    });

    // it('Should return the created user', async () => {
    //   const res = await chai.request(app).post('/auth/register').attach(
    //     'image',
    //     'test/utils/image.png',
    //   ).field('firstName', 'John')
    //     .field('lastName', 'Doe')
    //     .field('email', 'asd@asd.asd')
    //     .field('password', '123456');
    //
    //   expect(res.status).to.equal(201);
    //   expect(res.body.status).to.equal(201);
    //   expect(res.body).to.have.property('message');
    //   expect(res.body.message).to.have.property('email').that.equal('asd@asd.asd');
    // });
    // it('should return 409 if email is already taken', async () => {
    //   await db.User.create({
    //     firstName: 'John',
    //     lastName: 'Doe',
    //     email: 'used@used.used',
    //     password: '123456',
    //   });
    //   const res = await chai.request(app).post('/auth/register').attach(
    //     'image',
    //     'test/utils/image.png',
    //   ).field('firstName', 'John')
    //     .field('lastName', 'Doe')
    //     .field('email', 'used@used.used')
    //     .field('password', '123456');
    //
    //   expect(res.status).to.equal(409);
    //   expect(res.body.status).to.equal(409);
    //   expect(res.body).to.have.property('message').that.equal('Email already used');
    // });
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
        expect(res.body.errors).to.deep.equal(
          ['body[email]: Cannot be empty', 'body[email]: Must be a valid email'],
        );
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
        expect(res.body.errors).to.deep.equal([
          'body[email]: Must be a valid email',
        ]);
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
        expect(res.body.errors).to.deep.equal([
          'body[password]: Cannot be empty',
        ]);
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
