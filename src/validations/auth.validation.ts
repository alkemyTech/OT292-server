import { body, CustomValidator } from 'express-validator';

// const isValidEmail : CustomValidator = (value, {}) => {
//   console.log('Console.log :::> Custom :', value);
// };

// const existUser : CustomValidator = async (value : string, { req }) : Promise<Error | void> => { 
// };

// const isCorrectPassword : CustomValidator = async ( value : string, {req}) => {
// };

export default [
  // body().custom(isValidEmail),
  body('email').not().isEmpty().withMessage('Cannot be empty'),
  body('email').isEmail().withMessage('Must be a valid email'),
  body('password').not().isEmpty().withMessage('Cannot be empty'),
  // body('email').custom(existUser),
];
