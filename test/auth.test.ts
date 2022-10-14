// noinspection DuplicatedCode

import chai, { expect } from 'chai';
import chaiHttp = require('chai-http');
import db from '../src/models';
import app from '../src/app';

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
      it('should return 400 if email is already taken', async () => {
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

        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('errors');
        expect(res.body.errors).to.be.an('array');
        expect(res.body.errors).to.have.lengthOf(1);
        expect(res.body.errors[0]).to.deep.equal({
          value: 'used@used.used',
          msg: 'Email already in use',
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
  });
});
