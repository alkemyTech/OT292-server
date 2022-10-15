import { checkSchema } from 'express-validator';
import reportError from './reportErrorValidation';

const schemaName = checkSchema({
  name: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Name cannot be empty',
      bail: true,
    },
  },
});

const schemaEmail = checkSchema({
  email: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Email cannot be empty',
      bail: true,
    },
    isEmail: {
      errorMessage: 'Wrong email format',
      bail: true,
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
  },
});

const createContact = [
  ...schemaName,
  ...schemaEmail,
  reportError,
];

const readAll = [
  ...schemaLimit,
  ...schemaOffset,
  reportError,
];

export default {
  createContact,
  readAll,
};
