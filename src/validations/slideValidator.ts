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

export const validateRead = [
    ...schemaId,
    reportError,
  ];