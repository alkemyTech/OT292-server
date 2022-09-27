import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import createError from 'http-errors';

export default function reportError(req: Request, res: Response, next: NextFunction) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return next(createError(400, 'Input validation error', { expose: false, contents: result.array() }));
  }
  return next();
}
