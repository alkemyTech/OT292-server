import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiDatetime from 'chai-datetime';
import app from '../src/app';
import util, { baseCategory, baseNews } from './utils/util';
import { News } from '../src/models/news';
import { Role } from '../src/models/role';
import { User } from '../src/models/user';
import { Category } from '../src/models/category';

chai.use(chaiHttp);
chai.use(chaiDatetime);

describe('News controller test', () => {
  let adminBearerToken : string;
  let userBeaererToken : string;
  let categorySaved : Category;
  before(async () => {
    await Role.sync({ force: true });
    await User.sync({ force: true });
    await Category.sync({ force: true });
    adminBearerToken = await util.getToken('admin');
    userBeaererToken = await util.getToken('common');
    categorySaved = await Category.create(baseCategory);
  });

  // POST
  describe('POST /news/', () => {
    before(async () => {
      await News.sync({ force: true });
    });
    describe('Authentication', () => {
      it('should return 401 if unauthenticated', async () => {
        const badToken = `${adminBearerToken}a`;
        const res = await chai
          .request(app)
          .post('/news')
          .set('Authorization', badToken);

        expect(res).to.have.status(401);
      });

      it('should return 403 if unauthorized', async () => {
        const res = await chai
          .request(app)
          .post('/news')
          .set('Authorization', userBeaererToken);

        expect(res).to.have.status(403);
      });
    });
    describe('Validation', () => {
      describe('name', () => {
        it('should return 400 if is empty', async () => {
          const testNews = { ...baseNews, name: '' };

          const res = await chai
            .request(app)
            .post('/news/')
            .set('Authorization', adminBearerToken)
            .send(testNews);

          expect(res).to.have.status(400);
          expect(res.body).to.deep.include({
            status: 400,
            message: 'Input validation error',
            errors: ['body[name]: Name cannot be empty'],
          });
        });
        it('should return 400 if not string', async () => {
          const testNews = { ...baseNews, name: 123 };

          const res = await chai
            .request(app)
            .post('/news/')
            .set('Authorization', adminBearerToken)
            .send(testNews);

          expect(res).to.have.status(400);
          expect(res.body).to.deep.include({
            status: 400,
            message: 'Input validation error',
            errors: ['body[name]: Name must be string'],
          });
        });
      });
      describe('content', () => {
        it('should return 400 if is empty', async () => {
          const testNews = { ...baseNews, content: '' };

          const res = await chai
            .request(app)
            .post('/news/')
            .set('Authorization', adminBearerToken)
            .send(testNews);

          expect(res).to.have.status(400);
          expect(res.body).to.deep.include({
            status: 400,
            message: 'Input validation error',
            errors: ['body[content]: Content cannot be empty'],
          });
        });
        it('should return 400 if is not string', async () => {
          const testNews = { ...baseNews, content: 1231 };

          const res = await chai
            .request(app)
            .post('/news/')
            .set('Authorization', adminBearerToken)
            .send(testNews);

          expect(res).to.have.status(400);
          expect(res.body).to.deep.include({
            status: 400,
            message: 'Input validation error',
            errors: ['body[content]: Content must be string'],
          });
        });
      });
      describe('image', () => {
        it('should return 400 if is empty', async () => {
          const testNews = { ...baseNews, image: '' };

          const res = await chai
            .request(app)
            .post('/news/')
            .set('Authorization', adminBearerToken)
            .send(testNews);

          expect(res).to.have.status(400);
          expect(res.body).to.deep.include({
            status: 400,
            message: 'Input validation error',
            errors: ['body[image]: Image cannot be empty'],
          });
        });
        it('should return 400 if is not string', async () => {
          const testNews = { ...baseNews, image: 1231 };

          const res = await chai
            .request(app)
            .post('/news/')
            .set('Authorization', adminBearerToken)
            .send(testNews);

          expect(res).to.have.status(400);
          expect(res.body).to.deep.include({
            status: 400,
            message: 'Input validation error',
            errors: ['body[image]: Image must be string'],
          });
        });
      });
      describe('categoryId', () => {
        it('should return 400 if is empty', async () => {
          const testNews = { ...baseNews, categoryId: '' };

          const res = await chai
            .request(app)
            .post('/news/')
            .set('Authorization', adminBearerToken)
            .send(testNews);

          expect(res).to.have.status(400);
          expect(res.body).to.deep.include({
            status: 400,
            message: 'Input validation error',
            errors: ['body[categoryId]: Category ID cannot be empty'],
          });
        });
        it('should return 400 if is not string', async () => {
          const testNews = { ...baseNews, categoryId: 'one' };

          const res = await chai
            .request(app)
            .post('/news/')
            .set('Authorization', adminBearerToken)
            .send(testNews);

          expect(res).to.have.status(400);
          expect(res.body).to.deep.include({
            status: 400,
            message: 'Input validation error',
            errors: ['body[categoryId]: Category ID must be an integuer'],
          });
        });
      });
    });
    describe('Correct input', () => {
      it('should return 201 and news saved', async () => {
        const res = await chai
          .request(app)
          .post('/news/')
          .set('Authorization', adminBearerToken)
          .send(baseNews);

        expect(res).to.have.status(201);
        expect(res.body).to.has.property('status', 201);
        expect(res.body).to.has.property('message');
        expect(res.body.message).to.deep.include(baseNews);
      });
    });
  });

  // GET ALL
  describe('GET /news/', () => {
    let newsPreSaved : News[];
    before(async () => {
      await News.sync({ force: true });
      newsPreSaved = await util.fillNews(15);
    });

    describe('Authentication', () => {
      it('should return 401 if unauthenticated', async () => {
        const badToken = `${adminBearerToken}a`;
        const res = await chai
          .request(app)
          .get('/news')
          .set('Authorization', badToken);

        expect(res).to.have.status(401);
      });

      it('should return 403 if unauthorized', async () => {
        const res = await chai
          .request(app)
          .get('/news')
          .set('Authorization', userBeaererToken);

        expect(res).to.have.status(403);
      });
    });

    describe('Validation test', () => {
      it('should return 400 if limit & offset are empty', async () => {
        const query = 'limit=&offset=';

        const res = await chai
          .request(app)
          .get(`/news?${query}`)
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
          .get(`/news?${query}`)
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
            .get('/news')
            .set('Authorization', adminBearerToken);

          const totalPages = Math.ceil(newsPreSaved.length / 10);
          expect(initRes).to.have.status(200);
          expect(initRes.body).to.have.deep.property('status', 200);
          expect(initRes.body).to.have.property('message');
          expect(initRes.body.message.pagination.page).to.have.string('/news?page=1&offset=10&limit=10');
          expect(initRes.body.message.pagination.next).to.have.string('/news?page=2&offset=10&limit=10');
          expect(initRes.body.message.pagination.lastpage).to.have.string('/news?page=2&offset=10&limit=10');
          expect(initRes.body).to.have.nested.property('message.pagination.count', totalPages);
        });

        it(' - first page', async () => {
          const resPage1 = await chai
            .request(app)
            .get('/news?page=1&offset=10&limit=10')
            .set('Authorization', adminBearerToken);

          const totalPages = Math.ceil(newsPreSaved.length / 10);
          expect(resPage1).to.have.status(200);
          expect(resPage1.body).to.have.deep.property('status', 200);
          expect(resPage1.body).to.have.property('message');
          expect(resPage1.body.message.pagination.page).to.have.string('/news?page=1&offset=10&limit=10');
          expect(resPage1.body.message.pagination.next).to.have.string('/news?page=2&offset=10&limit=10');
          expect(resPage1.body.message.pagination.lastpage).to.have.string('/news?page=2&offset=10&limit=10');
          expect(resPage1.body).to.have.nested.property('message.pagination.count', totalPages);
          expect(resPage1.body.message.news).to.have.length(10);
        });

        it(' - last page', async () => {
          const resPage2 = await chai
            .request(app)
            .get('/news?page=2&offset=10&limit=10')
            .set('Authorization', adminBearerToken);

          const totalPages = Math.ceil(newsPreSaved.length / 10);
          expect(resPage2).to.have.status(200);
          expect(resPage2.body).to.have.deep.property('status', 200);
          expect(resPage2.body).to.have.property('message');
          expect(resPage2.body.message.pagination.page).to.have.string('/news?page=2&offset=10&limit=10');
          expect(resPage2.body).to.not.have.nested.property('message.pagination.next');
          expect(resPage2.body.message.pagination.lastpage).to.have.string('/news?page=2&offset=10&limit=10');
          expect(resPage2.body).to.have.nested.property('message.pagination.count', totalPages);
          expect(resPage2.body.message.news).to.have.length(5);
        });
      });
      describe('Page custom size', () => {
        it(' - init', async () => {
          const query = 'limit=2&offset=2';

          const initRes = await chai
            .request(app)
            .get(`/news?${query}`)
            .set('Authorization', adminBearerToken);

          const totalPages = Math.ceil(newsPreSaved.length / 2);
          expect(initRes).to.have.status(200);
          expect(initRes.body).to.have.deep.property('status', 200);
          expect(initRes.body).to.have.property('message');
          expect(initRes.body.message.pagination.page).to.have.string('/news?page=1&offset=2&limit=2');
          expect(initRes.body.message.pagination.next).to.have.string('/news?page=2&offset=2&limit=2');
          expect(initRes.body.message.pagination.lastpage).to.have.string('/news?page=8&offset=2&limit=2');
          expect(initRes.body).to.have.nested.property('message.pagination.count', totalPages);
        });

        it(' - first page', async () => {
          const query = 'page=1&offset=2&limit=2';

          const resPage1 = await chai
            .request(app)
            .get(`/news?${query}`)
            .set('Authorization', adminBearerToken);

          const totalPages = Math.ceil(newsPreSaved.length / 2);
          expect(resPage1).to.have.status(200);
          expect(resPage1.body).to.have.deep.property('status', 200);
          expect(resPage1.body).to.have.property('message');
          expect(resPage1.body.message.pagination.page).to.have.string('/news?page=1&offset=2&limit=2');
          expect(resPage1.body.message.pagination.next).to.have.string('/news?page=2&offset=2&limit=2');
          expect(resPage1.body.message.pagination.lastpage).to.have.string('/news?page=8&offset=2&limit=2');
          expect(resPage1.body).to.have.nested.property('message.pagination.count', totalPages);
          expect(resPage1.body.message.news).to.have.length(2);
        });

        it(' - last page', async () => {
          const query = 'page=8&offset=2&limit=2';

          const resPage2 = await chai
            .request(app)
            .get(`/news?${query}`)
            .set('Authorization', adminBearerToken);

          const totalPages = Math.ceil(newsPreSaved.length / 2);
          expect(resPage2).to.have.status(200);
          expect(resPage2.body).to.have.deep.property('status', 200);
          expect(resPage2.body).to.have.property('message');
          expect(resPage2.body.message.pagination.page).to.have.string('/news?page=8&offset=2&limit=2');
          expect(resPage2.body).to.not.have.nested.property('message.pagination.next');
          expect(resPage2.body.message.pagination.lastpage).to.have.string('/news?page=8&offset=2&limit=2');
          expect(resPage2.body).to.have.nested.property('message.pagination.count', totalPages);
          expect(resPage2.body.message.news).to.have.length(1);
        });
      });
    });
  });

  // GET DETAILS
  describe('GET /news/:id', () => {
    let newsPreSaved : News;
    before(async () => {
      await News.sync({ force: true });
      newsPreSaved = await News.create({
        name: baseNews.name,
        content: baseNews.content,
        image: baseNews.image,
        categoryId: categorySaved.id,
        type: 'old',
      });
    });
    describe('Authentication', () => {
      it('should return 401 if unauthenticated', async () => {
        const badToken = `${adminBearerToken}a`;
        const res = await chai
          .request(app)
          .get((`/news/${newsPreSaved.id}`))
          .set('Authorization', badToken);

        expect(res).to.have.status(401);
      });

      it('should return 403 if unauthorized', async () => {
        const res = await chai
          .request(app)
          .get((`/news/${newsPreSaved.id}`))
          .set('Authorization', userBeaererToken);

        expect(res).to.have.status(403);
      });
    });

    describe('Validation test', () => {
      it('should return 400 if id is not a string', async () => {
        const res = await chai
          .request(app)
          .get(('/news/asd'))
          .set('Authorization', adminBearerToken);

        expect(res).to.have.status(400);
        expect(res.body).to.deep.include({
          status: 400,
          message: 'Input validation error',
          errors: [
            'params[id]: ID must be an integuer',
          ],
        });
      });
    });
    describe('Correct input', () => {
      it('should return 200 and the news wanted', async () => {
        const res = await chai
          .request(app)
          .get((`/news/${newsPreSaved.id}`))
          .set('Authorization', adminBearerToken);
        expect(res).to.have.status(200);
        expect(res.body).to.have.deep.property('status', 200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.deep.include({
          ...baseNews,
          id: newsPreSaved.id,
        });
      });
    });
  });

  // PUT
  describe('PUT /news/', () => {
    let newsPreSaved : News;
    before(async () => {
      await News.sync({ force: true });
      newsPreSaved = await News.create({
        name: baseNews.name,
        content: baseNews.content,
        image: baseNews.image,
        categoryId: categorySaved.id,
        type: 'old',
      });
    });
    describe('Authentication', () => {
      it('should return 401 if unauthenticated', async () => {
        const badToken = `${adminBearerToken}a`;
        const res = await chai
          .request(app)
          .put(`/news/${newsPreSaved.id}`)
          .set('Authorization', badToken);

        expect(res).to.have.status(401);
      });

      it('should return 403 if unauthorized', async () => {
        const res = await chai
          .request(app)
          .put((`/news/${newsPreSaved.id}`))
          .set('Authorization', userBeaererToken);

        expect(res).to.have.status(403);
      });
    });
    describe('Validation', () => {
      describe('name', () => {
        it('should return 400 if is empty', async () => {
          const testNews = { ...baseNews, name: '' };

          const res = await chai
            .request(app)
            .put(`/news/${newsPreSaved.id}`)
            .set('Authorization', adminBearerToken)
            .send(testNews);

          expect(res).to.have.status(400);
          expect(res.body).to.deep.include({
            status: 400,
            message: 'Input validation error',
            errors: ['body[name]: Name cannot be empty'],
          });
        });
        it('should return 400 if not string', async () => {
          const testNews = { ...baseNews, name: 123 };

          const res = await chai
            .request(app)
            .put(`/news/${newsPreSaved.id}`)
            .set('Authorization', adminBearerToken)
            .send(testNews);

          expect(res).to.have.status(400);
          expect(res.body).to.deep.include({
            status: 400,
            message: 'Input validation error',
            errors: ['body[name]: Name must be string'],
          });
        });
      });
      describe('content', () => {
        it('should return 400 if is empty', async () => {
          const testNews = { ...baseNews, content: '' };

          const res = await chai
            .request(app)
            .put(`/news/${newsPreSaved.id}`)
            .set('Authorization', adminBearerToken)
            .send(testNews);

          expect(res).to.have.status(400);
          expect(res.body).to.deep.include({
            status: 400,
            message: 'Input validation error',
            errors: ['body[content]: Content cannot be empty'],
          });
        });
        it('should return 400 if is not string', async () => {
          const testNews = { ...baseNews, content: 1231 };

          const res = await chai
            .request(app)
            .put(`/news/${newsPreSaved.id}`)
            .set('Authorization', adminBearerToken)
            .send(testNews);

          expect(res).to.have.status(400);
          expect(res.body).to.deep.include({
            status: 400,
            message: 'Input validation error',
            errors: ['body[content]: Content must be string'],
          });
        });
      });
      describe('image', () => {
        it('should return 400 if is empty', async () => {
          const testNews = { ...baseNews, image: '' };

          const res = await chai
            .request(app)
            .put(`/news/${newsPreSaved.id}`)
            .set('Authorization', adminBearerToken)
            .send(testNews);

          expect(res).to.have.status(400);
          expect(res.body).to.deep.include({
            status: 400,
            message: 'Input validation error',
            errors: ['body[image]: Image cannot be empty'],
          });
        });
        it('should return 400 if is not string', async () => {
          const testNews = { ...baseNews, image: 1231 };

          const res = await chai
            .request(app)
            .put(`/news/${newsPreSaved.id}`)
            .set('Authorization', adminBearerToken)
            .send(testNews);

          expect(res).to.have.status(400);
          expect(res.body).to.deep.include({
            status: 400,
            message: 'Input validation error',
            errors: ['body[image]: Image must be string'],
          });
        });
      });
      describe('categoryId', () => {
        it('should return 400 if is empty', async () => {
          const testNews = { ...baseNews, categoryId: '' };

          const res = await chai
            .request(app)
            .put(`/news/${newsPreSaved.id}`)
            .set('Authorization', adminBearerToken)
            .send(testNews);

          expect(res).to.have.status(400);
          expect(res.body).to.deep.include({
            status: 400,
            message: 'Input validation error',
            errors: ['body[categoryId]: Category ID cannot be empty'],
          });
        });
        it('should return 400 if is not string', async () => {
          const testNews = { ...baseNews, categoryId: 'one' };

          const res = await chai
            .request(app)
            .put(`/news/${newsPreSaved.id}`)
            .set('Authorization', adminBearerToken)
            .send(testNews);

          expect(res).to.have.status(400);
          expect(res.body).to.deep.include({
            status: 400,
            message: 'Input validation error',
            errors: ['body[categoryId]: Category ID must be an integuer'],
          });
        });
      });
    });
    describe('Correct input', () => {
      it('should return 200 and news saved', async () => {
        const res = await chai
          .request(app)
          .put(`/news/${newsPreSaved.id}`)
          .set('Authorization', adminBearerToken)
          .send(baseNews);

        expect(res).to.have.status(200);
        expect(res.body).to.has.property('status', 200);
        expect(res.body).to.has.property('message');
        expect(res.body.message).to.deep.include(baseNews);
      });
    });
  });

  // DELETE
  describe('DELETE /news/:id', () => {
    let newsToDelete: News;

    before(async () => {
      await News.sync({ force: true });
      newsToDelete = await await News.create({
        name: baseNews.name,
        content: baseNews.content,
        image: baseNews.image,
        categoryId: categorySaved.id,
        type: 'old',
      });
    });

    describe('Authentication', () => {
      it('should return 401 if unauthenticated', async () => {
        const badToken = `${adminBearerToken}a`;
        const { id } = newsToDelete;

        const res = await chai
          .request(app)
          .delete(`/news/${id}`)
          .set('Authorization', badToken)
          .send(baseNews);

        expect(res).to.have.status(401);
      });

      it('should return 403 if unauthorized', async () => {
        const { id } = newsToDelete;
        const res = await chai
          .request(app)
          .delete(`/news/${id}`)
          .set('Authorization', userBeaererToken)
          .send(baseNews);

        expect(res).to.have.status(403);
      });
    });

    describe('Validations test', () => {
      describe('id', () => {
        it('should return 404 if is empty', async () => {
          const res = await chai
            .request(app)
            .delete('/news/')
            .set('Authorization', adminBearerToken)
            .send(baseNews);

          expect(res).to.have.status(404);
          expect(res.body).to.deep.include({
            status: 404,
            message: 'Route 127.0.0.1/news/ not found',
          });
        });
        it('should return 400 if is not integuer', async () => {
          const res = await chai
            .request(app)
            .delete('/news/NotInteguer')
            .set('Authorization', adminBearerToken)
            .send(baseNews);

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
            .delete('/news/99999')
            .set('Authorization', adminBearerToken)
            .send(baseNews);

          expect(res).to.have.status(404);
          expect(res.body).to.deep.include({ status: 404, message: 'Not Found' });
        });
      });
    });
    describe('Correct input', async () => {
      it('should return 204 and empty body ', async () => {
        const { id } = newsToDelete;
        const res = await chai
          .request(app)
          .delete(`/news/${id}`)
          .set('Authorization', adminBearerToken);

        expect(res).to.have.status(204);

        const result : News | null = await News.findByPk(Number(id));
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(result).to.be.null;
      });
    });
  });
});
