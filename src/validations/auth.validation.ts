import { body } from 'express-validator';
import reportError from './reportErrorValidation';

export default [
  body('email').not().isEmpty().withMessage('Cannot be empty'),
  body('email').isEmail().withMessage('Must be a valid email'),
  body('password').not().isEmpty().withMessage('Cannot be empty'),
  reportError,
];
