import { checkSchema, Schema } from 'express-validator';
import reportError from './reportErrorValidation';

const schema : Schema = {
  id: {
    in: ['query'],
    isInt: {
      errorMessage: 'ID must be an integuer',
    },
    toInt: true,
    optional: { options: { nullable: true } },
  },
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
  name: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Name cannot be empty',
    },
    isString: {
      errorMessage: 'Name must be string',
    },
  },
  content: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Content cannot be empty',
    },
    isString: {
      errorMessage: 'Content must be string',
    },
  },
  image: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Image cannot be empty',
    },
    isString: {
      errorMessage: 'Image must be string',
    },
  },
};

const validate = checkSchema(schema);

export default [
  ...validate,
  reportError,
];
