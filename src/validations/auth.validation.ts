import { body } from 'express-validator';

export default [
  body('email').not().isEmpty().withMessage('Cannot be empty'),
  body('email').isEmail().withMessage('Must be a valid email'),
  body('password').not().isEmpty().withMessage('Cannot be empty'),
];
