import {
  NextFunction, Request, Response,
} from 'express';

import indexRouter from './routes/index';

import usersRouter from './routes/users';
import authRouter from './routes/auth';
import organizationRouter from './routes/organizations';
import sendMailRouter from './routes/sendemail';
import newsRouter from './routes/news';

const createError = require('http-errors');
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
app.use('/news', newsRouter);
app.use('/organization', organizationRouter);
app.use('/sender', sendMailRouter);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

export default app;
