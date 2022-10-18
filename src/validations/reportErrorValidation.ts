import { NextFunction, Request, Response } from 'express';
import { validationResult, ValidationError } from 'express-validator';
import createError from 'http-errors';
import { errorHandler } from '../middlewares/error.handler';

const errorValidationFormatter = ({
  location, msg, param, value, nestedErrors,
}: ValidationError) => `${location}[${param}]: ${msg}`;

export default function reportError(req: Request, res: Response, next: NextFunction) {
  const result = validationResult(req).formatWith(errorValidationFormatter);
  if (!result.isEmpty()) {
    return next(createError(400, 'Input validation error', { expose: false, contents: result.array() }));
  }
  return next();
}