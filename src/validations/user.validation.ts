import { body } from 'express-validator';
import reportError from './reportErrorValidation';

const create = [
  body('firstName').not().isEmpty().withMessage('First name cannot be empty'),
  body('lastName').not().isEmpty().withMessage('Last name cannot be empty'),
  body('email').not().isEmpty().withMessage('Email cannot be empty'),
  body('email').isEmail().withMessage('Must be a valid email'),
  body('password').not().isEmpty().withMessage('Cannot be empty'),
  body('password').isLength({ min: 6 }).withMessage('Min 6 characters'),
  reportError,
];

const update = [
  body('firstName').not().isEmpty().withMessage('First name is required'),
  body('email').not().isEmpty().withMessage('Last name is required'),
  reportError,
];

export default {
  create,
  update,
};
