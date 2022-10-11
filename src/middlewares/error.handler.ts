import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

export const logError : Function = (error: Error): void => {
  console.error(error);
};

export const logErrorMiddleware : Function = (
  error : Error,
  req : Request,
  res : Response,
  next : NextFunction,
) : void => {
  logError(error);
  next(error);
};

export function errorHandler(
  error : any,
  req : Request,
  res : Response,
) : Response {
  const statusCode = error.status || 500;
  res.status(statusCode);
  if (error.contents) {
    return res.json({
      name: error.name,
      status: statusCode,
      message: error.message,
      contents: error.contents,
    });
  }
  return res.json({ name: error.name, status: statusCode, message: error.message });
}

export default {
  logError,
  createError,
  logErrorMiddleware,
  errorHandler,
};
