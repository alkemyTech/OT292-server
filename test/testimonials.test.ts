import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import db from '../src/models';
import app from '../src/app';
import { generateToken } from '../src/utils/jwt.handle';

chai.use(chaiHttp);

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

const Testimonio = {
  name: 'General',
  description: 'Categorias generales',
  image: 'Testimonio.png',
  content: 'content',
};
const TestimonioUpdate = {
  name: 'General actualizado',
  description: 'Categorias generales actualizado',
  image: 'Testimonio_actualizado.png',
  content: 'content2',
};

describe('Test Testimonial Controller', () => {
  let adminToken :string;
  let userToken : string;
  before(async () => {
    await db.sequelize.sync({ force: true });
    // @ts-ignore
    const roleAdmin = await db.Role.create({ name: 'admin' });
    const roleUser = await db.Role.create({ name: 'admin' });
    // @ts-ignore
    const user = await db.User.create(User);
    // @ts-ignore
    const userAdmin = await db.User.create(Admin);

    adminToken = generateToken(userAdmin.id, roleAdmin.id);
    userToken = generateToken(user.id, roleUser.id);
  });

  describe('create Testimonials', () => {
    it('Should return 400 if name is not provided', async () => {
      const res = await chai
        .request(app)
        .post('/testimonials/')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ content: 'contenido testimonio', image: 'testim.png' });
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
    it('Should return 400 if Content is not provided', async () => {
      const res = await chai
        .request(app)
        .post('/testimonials/')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Name testimonio', image: 'testim.png' });
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
    it('Should return 401 if user is not logged in', async () => {
      const res = await chai
        .request(app)
        .post('/testimonials/')
        .set('Authorization', 'Bearer ej4e58cx')
        .send(Testimonio);
      expect(res.status).to.equal(401);
      expect(res.body.status).to.equal(401);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.equal('Unauthorized');
    });

    it('Should return 403 if user is not admin', async () => {
      const res = await chai
        .request(app)
        .post('/testimonials/')
        .set('Authorization', `Bearer ${userToken}`)
        .send(Testimonio);
      expect(res.status).to.equal(403);
      expect(res.body.status).to.equal(403);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.equal('Forbidden');
    });

    it('Should return 200 create Testimonial Successful', async () => {
      const res = await chai
        .request(app)
        .post('/testimonials')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(Testimonio);
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal(200);
      expect(res.body).to.have.property('message').to.be.an('object');
      expect(res.body.message).to.have.property('id').that.equals(1);
    });
  });

  describe('get Testimonials', () => {
    it('get Testimonials 401 Invalid Token', async () => {
      const res = await chai
        .request(app)
        .get('/testimonials')
        .set('Authorization', 'Bearer d4e55q5');
      expect(res.status).to.equal(401);
      expect(res.body.status).to.equal(401);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.equal('Unauthorized');
    });
    it('get Testimonials getAll testimonials', async () => {
      const res = await chai
        .request(app)
        .get('/testimonials')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal(200);
      expect(res.body.message).to.be.an('object');
    });
  });

  describe('put Testimonials', () => {
    it('Should return 404 if id is invalid', async () => {
      const res = await chai
        .request(app)
        .put('/testimonials/invalid')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(TestimonioUpdate);
      expect(res.status).to.equal(404);
      expect(res.body.status).to.equal(404);
      expect(res.body).to.have.property('message').that.equals('Testimonial not found');
    });

    it('Should return 401 Invalid Token', async () => {
      const res = await chai
        .request(app)
        .put('/testimonials/1')
        .set('Authorization', 'Bearer e8mdk37x8')
        .send(TestimonioUpdate);
      expect(res.status).to.equal(401);
      expect(res.body.status).to.equal(401);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.equal('Unauthorized');
    });
    it('Should return 403 Forbidden', async () => {
      const res = await chai
        .request(app)
        .put('/testimonials/1')
        .set('Authorization', `Bearer ${userToken}`)
        .send(TestimonioUpdate);
      expect(res.status).to.equal(403);
      expect(res.body.status).to.equal(403);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.equal('Forbidden');
    });
    it('Should return 404', async () => {
      const res = await chai
        .request(app)
        .put('/testimonials/7')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.be.equal(404);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.equal('Testimonial not found');
    });
    it('Should return 200 Update Testimonial Successful', async () => {
      const res = await chai
        .request(app)
        .put('/testimonials/1')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(TestimonioUpdate);
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal(200);
      expect(res.body.message).to.have.property('id').that.equal(1);
      expect(res.body).to.have.property('message').to.be.an('object');
    });
  });
  describe('Delete Testimonials', () => {
    it('Should return 401 Invalid Token', async () => {
      const res = await chai
        .request(app)
        .delete('/testimonials/1')
        .set('Authorization', 'Bearer f67te63szxa3');
      expect(res.status).to.equal(401);
      expect(res.body.status).to.equal(401);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.equal('Unauthorized');
    });
    it('Should return 403 Forbidden', async () => {
      const res = await chai
        .request(app)
        .delete('/testimonials/1')
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.status).to.equal(403);
      expect(res.body.status).to.equal(403);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.equal('Forbidden');
    });

    it('Should return 404 Testimonials not found', async () => {
      const res = await chai
        .request(app)
        .delete('/testimonials/6')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.be.equal(404);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.equal('Testimonial not found');
    });

    it('Should return 200 delete Testimonials Successful', async () => {
      const res = await chai
        .request(app)
        .delete('/testimonials/1')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal(200);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.equal('Testimonial deleted');
    });
  });
});
