import { body } from 'express-validator';

export default [
  body('name').not().isEmpty().withMessage('Organization name cannot be empty'),
  body('email').not().isEmpty().withMessage('Organization email cannot be empty').isEmail().withMessage('Must be a valid email'),
  body('phone').isNumeric().withMessage('Only numbers allowed')
];
