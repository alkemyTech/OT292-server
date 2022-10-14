import { param, checkSchema, query } from 'express-validator';
import reportError from './reportErrorValidation';

const schemaId = checkSchema({
  id: {
    in: ['params'],
    exists: { errorMessage: 'Must provide an ID' },
    isInt: { errorMessage: 'ID must be an integuer' },
    toInt: true,
  },
});

const schemaName = checkSchema({
  name: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Name cannot be empty',
      bail: true,
    },
    isString: {
      errorMessage: 'Name must be string',
    },
  },
});

const schemaDescription = checkSchema({
  description: {
    in: ['body'],
    isString: {
      errorMessage: 'Content must be string',
    },
    optional: { options: { nullable: true } },
  },
});

const schemaImage = checkSchema({
  image: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Image cannot be empty',
      bail: true,
    },
    isString: {
      errorMessage: 'Image must be string',
    },
  },
});

export const deleteValidator = [
  param('id', 'Invalid id').exists().isInt(),
  reportError,
];

export const getDetailsValidator = [
  param('id', 'Invalid id').exists().isInt(),
  reportError,
];

export const createValidator = [
  param('name', 'Invalid name').exists().isString(),
  reportError,
];

export const updateValidator = [
  ...schemaId,
  ...schemaName,
  ...schemaDescription,
  ...schemaImage,
  reportError,
];
export const listValidator = [
  query('offset', 'Invalid offset').optional().isInt(),
  query('limit', 'Invalid limit').optional().isInt(),
  reportError,
];

export default {
  createValidator,
  deleteValidator,
  getDetailsValidator,
  listValidator,
  updateValidator,
};
