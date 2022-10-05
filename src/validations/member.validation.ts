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
  },
});

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
      bail: true,
    },
    isAlpha: {
      errorMessage: 'Name must be alphabetic',
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
      errorMessage:
                'the url must have the format : http://www.facebook.com/route',
    },
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
      errorMessage:
                'the url must have the format : http://www.instagram.com/route',
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
      errorMessage:
                'the url must have the format : http://www.linkedin.com/route',
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

export const validateReadAll = [
  ...schemaLimit,
  ...schemaOffset,
  reportError,
];

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

export const validateDelete = [...schemaId, reportError];

export const validateRead = [...schemaId, reportError];

export default {
  validateReadAll,
  validateCreation,
  validateUpdate,
  validateRead,
  validateDelete,
};
