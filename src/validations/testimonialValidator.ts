import { checkSchema } from 'express-validator';
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
    },
    isString: {
      errorMessage: 'Name must be string',
    },
  },
});

const schemaContent = checkSchema({
  content: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Content cannot be empty',
    },
    isString: {
      errorMessage: 'Content must be string',
    },
  },
});

const schemaImage = checkSchema({
  image: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Image cannot be empty',
    },
    isString: {
      errorMessage: 'Image must be string',
    },
  },
});

const schemaOffset = checkSchema({
  offset: {
    in: ['query'],
    notEmpty: {
      errorMessage: 'offset cannot be empty',
      bail: true,
    },
    isInt: {
      errorMessage: 'offset must be integuer',
      bail: true,
    },
    toInt: true,
    optional: { options: { nullable: true } },
  },
});

const schemaLimit = checkSchema({
  limit: {
    in: ['query'],
    notEmpty: {
      errorMessage: 'limit cannot be empty',
      bail: true,
    },
    isInt: {
      errorMessage: 'limit must be integuer',
      bail: true,
    },
    toInt: true,
    optional: { options: { nullable: true } },
  },
});

const validateCreation = [
  ...schemaName,
  ...schemaContent,
  reportError,
];

const validateUpdate = [
  ...schemaName,
  ...schemaContent,
  ...schemaImage,
  reportError,
];

const validateDelete = [
  ...schemaId,
  reportError,
];

const validateRead = [
  ...schemaId,
  reportError,
];

export const validateReadAll = [
  ...schemaLimit,
  ...schemaOffset,
  reportError,
];

export default {
  validateCreation,
  validateUpdate,
  validateRead,
  validateReadAll,
  validateDelete,
};
