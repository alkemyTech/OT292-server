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

const schemaFacebookUrl = checkSchema({
  facebookUrl: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Facebook url cannot be empty',
    },
    isString: {
      errorMessage: 'Facebook url must be string',
      bail: true,
    },
    isURL: {
      options: {
        require_protocol: true,
        require_valid_protocol: true,
        protocols: ['https'],
        require_host: true,
      },
      errorMessage: 'the url must have the format : http://www.facebook.com/route',
    },
    optional: { options: { nullable: true } },
  },
});

const schemaInstagramUrl = checkSchema({
  instagramUrl: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Instagram url cannot be empty',
    },
    isString: {
      errorMessage: 'Instagram url must be string',
      bail: true,
    },
    isURL: {
      options: {
        require_protocol: true,
        require_valid_protocol: true,
        protocols: ['https'],
        require_host: true,
      },
      errorMessage: 'the url must have the format : http://www.instagram.com/route',
    },
    optional: { options: { nullable: true } },
  },
});

const schemaLinkedinUrl = checkSchema({
  linkedinUrl: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Linkedin url cannot be empty',
    },
    isString: {
      errorMessage: 'Linkedin url must be string',
      bail: true,
    },
    isURL: {
      options: {
        require_protocol: true,
        require_valid_protocol: true,
        protocols: ['https'],
        require_host: true,
      },
      errorMessage: 'the url must have the format : http://www.linkedin.com/route',
    },
    optional: { options: { nullable: true } },
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

export const validateCreation = [
  ...schemaName,
  ...schemaFacebookUrl,
  ...schemaInstagramUrl,
  ...schemaLinkedinUrl,
  ...schemaImage,
  reportError,
];

export const validateUpdate = [
  ...schemaName,
  ...schemaFacebookUrl,
  ...schemaInstagramUrl,
  ...schemaLinkedinUrl,
  ...schemaImage,
  reportError,
];

export const validateDelete = [
  ...schemaId,
  reportError,
];

export const validateRead = [
  ...schemaId,
  reportError,
];

export default {
  validateCreation,
  validateUpdate,
  validateRead,
  validateDelete,
};
