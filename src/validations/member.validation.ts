import { checkSchema } from 'express-validator';
import reportError from './reportErrorValidation';

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

export const validateReadAll = [
  ...schemaLimit,
  ...schemaOffset,
  reportError,
];

export default {
  validateReadAll,
};
