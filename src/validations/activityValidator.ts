import { checkSchema } from 'express-validator';
import reportError from './reportErrorValidation';

const schemaId = checkSchema({
  id: {
    in: ['params'],
    exists: { errorMessage: 'Must provide an ID' },
    isInt: { errorMessage: 'ID must be an integer' },
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

const validateCreation = [
  ...schemaName,
  ...schemaContent,
  reportError,
];

const validateUpdate = [
  ...schemaId,
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
