import {
  NextFunction, Request, Response,
} from 'express';

import createError from 'http-errors';
import { errorHandler } from './middlewares/error.handler';
import indexRouter from './routes/index';

import usersRouter from './routes/users';
import authRouter from './routes/auth';
import organizationRouter from './routes/organizations';
import categoryRouter from './routes/categories';
import newsRouter from './routes/news';
import sendMailRouter from './routes/sendemail';
import activitiesRouter from './routes/activities';
import slideRouter from './routes/slide';
import membersRouter from './routes/members';

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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
app.use('/slides',slideRouter);
app.use('/members', membersRouter);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  const error : Error = createError(404, `Route ${req.hostname + req.path} not found`, { expose: false });
  next(error);
});

app.use(errorHandler);

export default app;
