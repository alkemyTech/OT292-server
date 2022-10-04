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

const createContact = [
  ...schemaName,
  ...schemaEmail,
  reportError,
];

export default {
  createContact,
};
