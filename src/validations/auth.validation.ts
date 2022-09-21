import { body, CustomValidator } from 'express-validator';
import db from '../models';

// const isValidEmail : CustomValidator = (value, {}) => {
//   console.log('Console.log :::> Custom :', value);
// };

const existUser : CustomValidator = () => {

};

export default [
  // body().custom(isValidEmail),
  body('email').not().isEmpty().withMessage('Cannot be empty'),
  body('email').isEmail().withMessage('Must be a valid email'),
  body('password').not().isEmpty().withMessage('Cannot be empty'),
];
