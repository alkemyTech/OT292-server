import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiDatetime from 'chai-datetime';
import db from '../src/models';
import app from '../src/app';
import util, { baseMember } from './utils/util';
import { Member } from '../src/models/member';
import { Role } from '../src/models/role';
import { User } from '../src/models/user';

chai.use(chaiHttp);
chai.use(chaiDatetime);

describe('Member controller test', () => {
  let adminBearerToken : string;
  let userBeaererToken : string;

  before(async () => {
    await Role.sync({ force: true });
    await User.sync({ force: true });
    adminBearerToken = await util.getToken('admin');
    userBeaererToken = await util.getToken('common');
  });

  describe('POST /members/', () => {
    before(async () => {
      await db.Member.sync({ force: true });
    });

    describe('Authentication', () => {
      it('should return 401 if unauthenticated', async () => {
        const badToken = `${adminBearerToken}a`;
        const res = await chai
          .request(app)
          .post('/members/')
          .set('Authorization', badToken)
          .send(baseMember);

        expect(res).to.have.status(401);
      });
    });

    describe('Validations test', () => {
      describe('name', () => {
        it('should return 400 if is empty', async () => {
          const testMember = { ...baseMember, name: '' };

          const res = await chai
            .request(app)
            .post('/members/')
            .set('Authorization', adminBearerToken)
            .send(testMember);

          expect(res).to.have.status(400);
          expect(res.body).to.deep.include({
            status: 400,
            message: 'Input validation error',
            errors: ['body[name]: Name cannot be empty'],
          });
        });
        it('should return 400 if not string', async () => {
          const testMember = { ...baseMember, name: 123 };

          const res = await chai
            .request(app)
            .post('/members/')
            .set('Authorization', adminBearerToken)
            .send(testMember);

          expect(res).to.have.status(400);
          expect(res.body).to.deep.include({
            status: 400,
            message: 'Input validation error',
            errors: ['body[name]: Name must be string'],
          });
        });
        it('should return 400 if not alphabetic', async () => {
          const testMember = { ...baseMember, name: 'Alph4numer1c00' };

          const res = await chai
            .request(app)
            .post('/members/')
            .set('Authorization', adminBearerToken)
            .send(testMember);

          expect(res).to.have.status(400);
          expect(res.body).to.deep.include({
            status: 400,
            message: 'Input validation error',
            errors: ['body[name]: Name must be alphabetic'],
          });
        });
      });
      describe('facebookUrl - instagramUrl - linkedinUrl', () => {
        it('should return 400 if is empty', async () => {
          const testMember = {
            ...baseMember,
            facebookUrl: '',
            instagramUrl: '',
            linkedinUrl: '',
          };

          const res = await chai
            .request(app)
            .post('/members/')
            .set('Authorization', adminBearerToken)
            .send(testMember);

          expect(res).to.have.status(400);
          expect(res.body).to.deep.include({
            status: 400,
            message: 'Input validation error',
            errors: [
              'body[facebookUrl]: Facebook url cannot be empty',
              'body[instagramUrl]: Instagram url cannot be empty',
              'body[linkedinUrl]: Linkedin url cannot be empty',
            ],
          });
        });
        it('should return 400 if not a string', async () => {
          const testMember = {
            ...baseMember,
            facebookUrl: 123,
            instagramUrl: 456,
            linkedinUrl: 789,
          };
          const res = await chai
            .request(app)
            .post('/members/')
            .set('Authorization', adminBearerToken)
            .send(testMember);

          expect(res).to.have.status(400);
          expect(res.body).to.deep.include({
            status: 400,
            message: 'Input validation error',
            errors: [
              'body[facebookUrl]: Facebook url must be string',
              'body[instagramUrl]: Instagram url must be string',
              'body[linkedinUrl]: Linkedin url must be string',
            ],
          });
        });
        it('should return 400 if not a url', async () => {
          const testMember = {
            ...baseMember,
            facebookUrl: 'https://www.???.com',
            instagramUrl: 'https://www.???.com',
            linkedinUrl: 'https://www.???.com',
          };

          const res = await chai
            .request(app)
            .post('/members/')
            .set('Authorization', adminBearerToken)
            .send(testMember);

          expect(res).to.have.status(400);
          expect(res.body).to.deep.include({
            status: 400,
            message: 'Input validation error',
            errors: [
              'body[facebookUrl]: the url must have the format : https://www.facebook.com/route',
              'body[instagramUrl]: the url must have the format : https://www.instagram.com/route',
              'body[linkedinUrl]: the url must have the format : https://www.linkedin.com/route',
            ],
          });
        });
      });
      describe('image', () => {
        it('should return 400 if is empty', async () => {
          const testMember = { ...baseMember, image: '' };

          const res = await chai
            .request(app)
            .post('/members/')
            .set('Authorization', adminBearerToken)
            .send(testMember);

          expect(res).to.have.status(400);
          expect(res.body).to.deep.include({
            status: 400,
            message: 'Input validation error',
            errors: ['body[image]: Image cannot be empty'],
          });
        });
        it('should return 400 if is not string', async () => {
          const testMember = { ...baseMember, image: 1231 };

          const res = await chai
            .request(app)
            .post('/members/')
            .set('Authorization', adminBearerToken)
            .send(testMember);

          expect(res).to.have.status(400);
          expect(res.body).to.deep.include({
            status: 400,
            message: 'Input validation error',
            errors: ['body[image]: Image must be string'],
          });
        });
      });
      describe('description', () => {
        it('should return 400 if is not string', async () => {
          const testMember = { ...baseMember, description: 1231 };

          const res = await chai
            .request(app)
            .post('/members/')
            .set('Authorization', adminBearerToken)
            .send(testMember);

          expect(res).to.have.status(400);
          expect(res.body).to.deep.include({
            status: 400,
            message: 'Input validation error',
            errors: ['body[description]: Description must be string'],
          });
        });
      });
    });
    describe('Correct input', () => {
      it('should return the member saved', async () => {
        const res = await chai
          .request(app)
          .post('/members/')
          .set('Authorization', adminBearerToken)
          .send(baseMember);

        expect(res).to.have.status(201);
        expect(res.body).to.has.property('status', 201);
        expect(res.body).to.has.property('message');
        expect(res.body.message).to.deep.include(baseMember);
      });
    });
  });

  describe('GET /members/', () => {
    let membersPreSaved : Member[];

    before(async () => {
      await db.Member.sync({ force: true });
      membersPreSaved = await util.fillMember(15);
    });

    describe('Authentication', () => {
      it('should return 401 if unauthenticated', async () => {
        const badToken = `${adminBearerToken}a`;
        const res = await chai
          .request(app)
          .get('/members')
          .set('Authorization', badToken);

        expect(res).to.have.status(401);
      });

      it('should return 403 if unauthorized', async () => {
        const res = await chai
          .request(app)
          .get('/members')
          .set('Authorization', userBeaererToken);

        expect(res).to.have.status(403);
      });
    });

    describe('Validation test', () => {
      it('should return 400 if limit & offset are empty', async () => {
        const query = 'limit=&offset=';

        const res = await chai
          .request(app)
          .get(`/members?${query}`)
          .set('Authorization', adminBearerToken);

        expect(res).to.have.status(400);
        expect(res.body).to.deep.include({
          status: 400,
          message: 'Input validation error',
          errors: [
            'query[limit]: limit cannot be empty',
            'query[offset]: offset cannot be empty',
          ],
        });
      });
      it('should return 400 if limit & offset are not integuer', async () => {
        const query = 'limit=asd&offset=5.5';

        const res = await chai
          .request(app)
          .get(`/members?${query}`)
          .set('Authorization', adminBearerToken);

        expect(res).to.have.status(400);
        expect(res.body).to.deep.include({
          status: 400,
          message: 'Input validation error',
          errors: [
            'query[limit]: limit must be integuer',
            'query[offset]: offset must be integuer',
          ],
        });
      });
    });
    describe('Correct input', () => {
      describe('Page default size', () => {
        it(' - init', async () => {
          const initRes = await chai
            .request(app)
            .get('/members')
            .set('Authorization', adminBearerToken);

          const totalPages = Math.ceil(membersPreSaved.length / 10);
          expect(initRes).to.have.status(200);
          expect(initRes.body).to.have.deep.property('status', 200);
          expect(initRes.body).to.have.property('message');
          expect(initRes.body.message.pagination.page).to.have.string('/members?page=1&offset=10&limit=10');
          expect(initRes.body.message.pagination.next).to.have.string('/members?page=2&offset=10&limit=10');
          expect(initRes.body.message.pagination.lastpage).to.have.string('/members?page=2&offset=10&limit=10');
          expect(initRes.body).to.have.nested.property('message.pagination.count', totalPages);
        });

        it(' - first page', async () => {
          const resPage1 = await chai
            .request(app)
            .get('/members?page=1&offset=10&limit=10')
            .set('Authorization', adminBearerToken);

          const totalPages = Math.ceil(membersPreSaved.length / 10);
          expect(resPage1).to.have.status(200);
          expect(resPage1.body).to.have.deep.property('status', 200);
          expect(resPage1.body).to.have.property('message');
          expect(resPage1.body.message.pagination.page).to.have.string('/members?page=1&offset=10&limit=10');
          expect(resPage1.body.message.pagination.next).to.have.string('/members?page=2&offset=10&limit=10');
          expect(resPage1.body.message.pagination.lastpage).to.have.string('/members?page=2&offset=10&limit=10');
          expect(resPage1.body).to.have.nested.property('message.pagination.count', totalPages);
          expect(resPage1.body.message.members).to.have.length(10);
        });

        it(' - last page', async () => {
          const resPage2 = await chai
            .request(app)
            .get('/members?page=2&offset=10&limit=10')
            .set('Authorization', adminBearerToken);

          const totalPages = Math.ceil(membersPreSaved.length / 10);
          expect(resPage2).to.have.status(200);
          expect(resPage2.body).to.have.deep.property('status', 200);
          expect(resPage2.body).to.have.property('message');
          expect(resPage2.body.message.pagination.page).to.have.string('/members?page=2&offset=10&limit=10');
          expect(resPage2.body).to.not.have.nested.property('message.pagination.next');
          expect(resPage2.body.message.pagination.lastpage).to.have.string('/members?page=2&offset=10&limit=10');
          expect(resPage2.body).to.have.nested.property('message.pagination.count', totalPages);
          expect(resPage2.body.message.members).to.have.length(5);
        });
      });
      describe('Page custom size', () => {
        it(' - init', async () => {
          const query = 'limit=2&offset=2';

          const initRes = await chai
            .request(app)
            .get(`/members?${query}`)
            .set('Authorization', adminBearerToken);

          const totalPages = Math.ceil(membersPreSaved.length / 2);
          expect(initRes).to.have.status(200);
          expect(initRes.body).to.have.deep.property('status', 200);
          expect(initRes.body).to.have.property('message');
          expect(initRes.body.message.pagination.page).to.have.string('/members?page=1&offset=2&limit=2');
          expect(initRes.body.message.pagination.next).to.have.string('/members?page=2&offset=2&limit=2');
          expect(initRes.body.message.pagination.lastpage).to.have.string('/members?page=8&offset=2&limit=2');
          expect(initRes.body).to.have.nested.property('message.pagination.count', totalPages);
        });

        it(' - first page', async () => {
          const query = 'page=1&offset=2&limit=2';

          const resPage1 = await chai
            .request(app)
            .get(`/members?${query}`)
            .set('Authorization', adminBearerToken);

          const totalPages = Math.ceil(membersPreSaved.length / 2);
          expect(resPage1).to.have.status(200);
          expect(resPage1.body).to.have.deep.property('status', 200);
          expect(resPage1.body).to.have.property('message');
          expect(resPage1.body.message.pagination.page).to.have.string('/members?page=1&offset=2&limit=2');
          expect(resPage1.body.message.pagination.next).to.have.string('/members?page=2&offset=2&limit=2');
          expect(resPage1.body.message.pagination.lastpage).to.have.string('/members?page=8&offset=2&limit=2');
          expect(resPage1.body).to.have.nested.property('message.pagination.count', totalPages);
          expect(resPage1.body.message.members).to.have.length(2);
        });

        it(' - last page', async () => {
          const query = 'page=8&offset=2&limit=2';

          const resPage2 = await chai
            .request(app)
            .get(`/members?${query}`)
            .set('Authorization', adminBearerToken);

          const totalPages = Math.ceil(membersPreSaved.length / 2);
          expect(resPage2).to.have.status(200);
          expect(resPage2.body).to.have.deep.property('status', 200);
          expect(resPage2.body).to.have.property('message');
          expect(resPage2.body.message.pagination.page).to.have.string('/members?page=8&offset=2&limit=2');
          expect(resPage2.body).to.not.have.nested.property('message.pagination.next');
          expect(resPage2.body.message.pagination.lastpage).to.have.string('/members?page=8&offset=2&limit=2');
          expect(resPage2.body).to.have.nested.property('message.pagination.count', totalPages);
          expect(resPage2.body.message.members).to.have.length(1);
        });
      });
    });
  });

  describe('PUT /members/:id', async () => {
    let memberToUpdate: Member;

    before(async () => {
      await db.Member.sync({ force: true });
      memberToUpdate = await util.saveMember();
    });

    describe('Authentication', () => {
      it('should return 401 if unauthenticated', async () => {
        const badToken = `${adminBearerToken}a`;
        const res = await chai
          .request(app)
          .put(`/members/${memberToUpdate.id}`)
          .set('Authorization', badToken)
          .send(baseMember);

        expect(res).to.have.status(401);
      });
    });

    describe('Validations test', () => {
      describe('id', () => {
        it('should return 404 if is empty', async () => {
          const res = await chai
            .request(app)
            .put('/members/')
            .set('Authorization', userBeaererToken)
            .send(baseMember);

          expect(res).to.have.status(404);
          expect(res.body).to.deep.include({
            status: 404,
            message: 'Route 127.0.0.1/members/ not found',
          });
        });
        it('should return 400 if is not integuer', async () => {
          const res = await chai
            .request(app)
            .put('/members/NotInteguer')
            .set('Authorization', userBeaererToken)
            .send(baseMember);

          expect(res).to.have.status(400);
          expect(res.body).to.deep.include({
            status: 400,
            message: 'Input validation error',
            errors: ['params[id]: ID must be an integuer'],
          });
        });
        it('should return 404 if member id not exist', async () => {
          const res = await chai
            .request(app)
            .put('/members/99999')
            .set('Authorization', userBeaererToken)
            .send(baseMember);

          expect(res).to.have.status(404);
          expect(res.body).to.deep.include({ status: 404, message: 'Not Found' });
        });
      });
      describe('name', () => {
        it('should return 400 if is empty', async () => {
          const testMember = { ...baseMember, name: '' };

          const res = await chai
            .request(app)
            .put(`/members/${memberToUpdate.id}`)
            .set('Authorization', userBeaererToken)
            .send(testMember);

          expect(res).to.have.status(400);
          expect(res.body).to.deep.include({
            status: 400,
            message: 'Input validation error',
            errors: ['body[name]: Name cannot be empty'],
          });
        });
        it('should return 400 if not string', async () => {
          const testMember = { ...baseMember, name: 123 };

          const res = await chai
            .request(app)
            .put(`/members/${memberToUpdate.id}`)
            .set('Authorization', userBeaererToken)
            .send(testMember);

          expect(res).to.have.status(400);
          expect(res.body).to.deep.include({
            status: 400,
            message: 'Input validation error',
            errors: ['body[name]: Name must be string'],
          });
        });
        it('should return 400 if not alphabetic', async () => {
          const testMember = { ...baseMember, name: 'Alph4numer1c00' };

          const res = await chai
            .request(app)
            .put(`/members/${memberToUpdate.id}`)
            .set('Authorization', userBeaererToken)
            .send(testMember);

          expect(res).to.have.status(400);
          expect(res.body).to.deep.include({
            status: 400,
            message: 'Input validation error',
            errors: ['body[name]: Name must be alphabetic'],
          });
        });
      });
      describe('facebookUrl - instagramUrl - linkedinUrl', () => {
        it('should return 400 if is empty', async () => {
          const testMember = {
            ...baseMember,
            facebookUrl: '',
            instagramUrl: '',
            linkedinUrl: '',
          };

          const res = await chai
            .request(app)
            .put(`/members/${memberToUpdate.id}`)
            .set('Authorization', userBeaererToken)
            .send(testMember);

          expect(res).to.have.status(400);
          expect(res.body).to.deep.include({
            status: 400,
            message: 'Input validation error',
            errors: [
              'body[facebookUrl]: Facebook url cannot be empty',
              'body[instagramUrl]: Instagram url cannot be empty',
              'body[linkedinUrl]: Linkedin url cannot be empty',
            ],
          });
        });
        it('should return 400 if not a string', async () => {
          const testMember = {
            ...baseMember,
            facebookUrl: 123,
            instagramUrl: 456,
            linkedinUrl: 789,
          };
          const res = await chai
            .request(app)
            .put(`/members/${memberToUpdate.id}`)
            .set('Authorization', userBeaererToken)
            .send(testMember);

          expect(res).to.have.status(400);
          expect(res.body).to.deep.include({
            status: 400,
            message: 'Input validation error',
            errors: [
              'body[facebookUrl]: Facebook url must be string',
              'body[instagramUrl]: Instagram url must be string',
              'body[linkedinUrl]: Linkedin url must be string',
            ],
          });
        });
        it('should return 400 if not a url', async () => {
          const testMember = {
            ...baseMember,
            facebookUrl: 'https://www.???.com',
            instagramUrl: 'https://www.???.com',
            linkedinUrl: 'https://www.???.com',
          };

          const res = await chai
            .request(app)
            .put(`/members/${memberToUpdate.id}`)
            .set('Authorization', userBeaererToken)
            .send(testMember);

          expect(res).to.have.status(400);
          expect(res.body).to.deep.include({
            status: 400,
            message: 'Input validation error',
            errors: [
              'body[facebookUrl]: the url must have the format : https://www.facebook.com/route',
              'body[instagramUrl]: the url must have the format : https://www.instagram.com/route',
              'body[linkedinUrl]: the url must have the format : https://www.linkedin.com/route',
            ],
          });
        });
      });
      describe('image', () => {
        it('should return 400 if is empty', async () => {
          const testMember = { ...baseMember, image: '' };

          const res = await chai
            .request(app)
            .put(`/members/${memberToUpdate.id}`)
            .set('Authorization', userBeaererToken)
            .send(testMember);

          expect(res).to.have.status(400);
          expect(res.body).to.deep.include({
            status: 400,
            message: 'Input validation error',
            errors: ['body[image]: Image cannot be empty'],
          });
        });
        it('should return 400 if is not string', async () => {
          const testMember = { ...baseMember, image: 1231 };

          const res = await chai
            .request(app)
            .put(`/members/${memberToUpdate.id}`)
            .set('Authorization', userBeaererToken)
            .send(testMember);

          expect(res).to.have.status(400);
          expect(res.body).to.deep.include({
            status: 400,
            message: 'Input validation error',
            errors: ['body[image]: Image must be string'],
          });
        });
      });
      describe('description', () => {
        it('should return 400 if is not string', async () => {
          const testMember = { ...baseMember, description: 1231 };

          const res = await chai
            .request(app)
            .put(`/members/${memberToUpdate.id}`)
            .set('Authorization', userBeaererToken)
            .send(testMember);

          expect(res).to.have.status(400);
          expect(res.body).to.deep.include({
            status: 400,
            message: 'Input validation error',
            errors: ['body[description]: Description must be string'],
          });
        });
      });
    });
    describe('Correct input', () => {
      it('should return the member updated', async () => {
        const chagesMember = {
          name: 'Leonardo',
          facebookUrl: 'https://www.facebook.com/route2',
          instagramUrl: 'https://www.instagram.com/route2',
          linkedinUrl: 'https://www.linkedin.com/route2',
          image: 'https://www.imageBank.com/img2',
          description: 'some description but now different',
        };

        const res = await chai
          .request(app)
          .put(`/members/${memberToUpdate.id}`)
          .set('Authorization', userBeaererToken)
          .send(chagesMember);

        expect(res).to.have.status(200);
        expect(res.body).to.has.property('status', 200);
        expect(res.body).to.has.property('message');
        expect(res.body.message).to.deep.include(chagesMember);
        expect(new Date(res.body.message.updatedAt)).to.be
          .afterTime(new Date(memberToUpdate.createdAt));
      });
    });
  });

  describe('Delete /members/:id', () => {
    let memberToDelete: Member;

    before(async () => {
      await db.Member.sync({ force: true });
      memberToDelete = await util.saveMember();
    });

    describe('Authentication', () => {
      it('should return 401 if unauthenticated', async () => {
        const badToken = `${adminBearerToken}a`;
        const { id } = memberToDelete;

        const res = await chai
          .request(app)
          .delete(`/members/${id}`)
          .set('Authorization', badToken)
          .send(baseMember);

        expect(res).to.have.status(401);
      });

      it('should return 403 if unauthorized', async () => {
        const { id } = memberToDelete;
        const res = await chai
          .request(app)
          .delete(`/members/${id}`)
          .set('Authorization', userBeaererToken)
          .send(baseMember);

        expect(res).to.have.status(403);
      });
    });

    describe('Validations test', () => {
      describe('id', () => {
        it('should return 404 if is empty', async () => {
          const res = await chai
            .request(app)
            .delete('/members/')
            .set('Authorization', adminBearerToken)
            .send(baseMember);

          expect(res).to.have.status(404);
          expect(res.body).to.deep.include({
            status: 404,
            message: 'Route 127.0.0.1/members/ not found',
          });
        });
        it('should return 400 if is not integuer', async () => {
          const res = await chai
            .request(app)
            .delete('/members/NotInteguer')
            .set('Authorization', adminBearerToken)
            .send(baseMember);

          expect(res).to.have.status(400);
          expect(res.body).to.deep.include({
            status: 400,
            message: 'Input validation error',
            errors: ['params[id]: ID must be an integuer'],
          });
        });
        it('should return 404 if member id not exist', async () => {
          const res = await chai
            .request(app)
            .delete('/members/99999')
            .set('Authorization', adminBearerToken)
            .send(baseMember);

          expect(res).to.have.status(404);
          expect(res.body).to.deep.include({ status: 404, message: 'Not Found' });
        });
      });
    });
    describe('Correct input', async () => {
      it('should return 204 and empty body ', async () => {
        const { id } = memberToDelete;
        const res = await chai
          .request(app)
          .delete(`/members/${id}`)
          .set('Authorization', adminBearerToken);

        expect(res).to.have.status(204);

        const result : Member | null = await db.Member.findByPk(Number(id));
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(result).to.be.null;
      });
    });
  });
});
