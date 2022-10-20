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
      bail: true,
    },
    isString: {
      errorMessage: 'Name must be string',
    },
  },
});

const schemaCategoryId = checkSchema({
  categoryId: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Category ID cannot be empty',
      bail: true,
    },
    isInt: {
      errorMessage: 'Category ID must be an integuer',
    },
    toInt: true,
    optional: { options: { nullable: true } },
  },
});

const schemaContent = checkSchema({
  content: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Content cannot be empty',
      bail: true,
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
      bail: true,
    },
    isString: {
      errorMessage: 'Image must be string',
    },
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

const validateCreation = [
  ...schemaName,
  ...schemaContent,
  ...schemaImage,
  ...schemaCategoryId,
  reportError,
];

const validateUpdate = [
  ...schemaName,
  ...schemaContent,
  ...schemaImage,
  ...schemaCategoryId,
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

export const validateGetComments = [
  ...schemaId,
  reportError,
];

export default {
  validateCreation,
  validateUpdate,
  validateRead,
  validateReadAll,
  validateDelete,
  validateGetComments,
};
