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

const schemaCategoryId = checkSchema({
  categoryId: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Category ID cannot be empty',
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

export default {
  validateCreation,
  validateUpdate,
  validateRead,
  validateDelete,
};
