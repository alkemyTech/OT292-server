import { body, checkSchema } from 'express-validator';
import reportError from './reportErrorValidation';

const schemaId = checkSchema({
  id: {
    in: ['params'],
    exists: { errorMessage: 'Must provide an ID' },
    isInt: { errorMessage: 'ID must be an integuer' },
    toInt: true,
  },
});

const schemaImageUrl = checkSchema({
  imageUrl: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'imageUrl cannot be empty',
      bail: true,
    },
    isString: {
      errorMessage: 'imageUrl must be string',
    },
    optional: { options: { nullable: true } },
  },
});

const schemaText = checkSchema({
  text: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Name cannot be empty',
      bail: true,
    },
    isString: {
      errorMessage: 'Name must be string',
    },
    optional: { options: { nullable: true } },
  },
});

const schemaOrder = checkSchema({
  order: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Order cannot be empty',
      bail: true,
    },
    isString: {
      errorMessage: 'Order must be string',
    },
    optional: { options: { nullable: true } },
  },
});

const schemaOrganizationId = checkSchema({
  organizationId: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Organization cannot be empty',
    },
    isInt: {
      errorMessage: 'Organization must be Integer',
    },
    optional: { options: { nullable: true } },
  },
});

export const validateCreate = [
  body('text').exists().withMessage('Must provide a text'),
  body('order').exists().withMessage('Must provide an order'),
  body('organizationId').exists().withMessage('Must provide an organizationId'),
  reportError,
];

export const validateUpdate = [
  ...schemaId,
  ...schemaImageUrl,
  ...schemaText,
  ...schemaOrder,
  ...schemaOrganizationId,
  reportError,
];

export const validateRead = [
  ...schemaId,
  reportError,
];

export default {
  validateCreate,
  validateRead,
  validateUpdate,
};
