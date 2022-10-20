import {
  NextFunction, Request, Response,
} from 'express';

import createError from 'http-errors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { errorHandler } from './middlewares/error.handler';
import indexRouter from './routes/index';

import usersRouter from './routes/users';
import authRouter from './routes/auth';
import organizationRouter from './routes/organizations';
import categoryRouter from './routes/categories';
import newsRouter from './routes/news';
import sendMailRouter from './routes/sendemail';
import activitiesRouter from './routes/activities';
import testimonioRouter from './routes/testimonials';
import slideRouter from './routes/slide';
import membersRouter from './routes/members';
import contactsRouter from './routes/contacts';
import backofficeRouter from './routes/backoffice';
import swaggerDocument from '../docs/openapi.json';
import commentsRouter from './routes/comments'

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(helmet());
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/organization', organizationRouter);
app.use('/sender', sendMailRouter);
app.use('/categories', categoryRouter);
app.use('/news', newsRouter);
app.use('/activities', activitiesRouter);
app.use('/testimonials', testimonioRouter);
app.use('/slides', slideRouter);
app.use('/members', membersRouter);
app.use('/contacts', contactsRouter);
<<<<<<< HEAD
app.use('/backoffice', backofficeRouter); 
=======
app.use('/backoffice', backofficeRouter);

>>>>>>> ce7a7a04000350e5b3c0ade31dd0c6b8fdbcde94
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/comments',commentsRouter);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  const error: Error = createError(404, `Route ${req.hostname + req.path} not found`, { expose: false });
  next(error);
});

app.use(errorHandler);

export default app;
