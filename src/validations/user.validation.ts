import { body } from 'express-validator';

export default [
  body('firstName').not().isEmpty().withMessage('First name is required'),
  body('email').not().isEmpty().withMessage('Last name is required'),
];
