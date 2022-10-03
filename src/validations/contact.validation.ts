import { checkSchema } from 'express-validator';
import reportError from './reportErrorValidation';

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

const readAll = [
  ...schemaLimit,
  ...schemaOffset,
  reportError,
];

export default {
  readAll,
};
