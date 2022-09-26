import { body } from 'express-validator';

export default [
  body('name').not().isEmpty().withMessage('Activity name cannot be empty'),
  body('content').not().isEmpty().withMessage('Content cannot be empty'),
  body('image').not().isEmpty().withMessage('Image cannot be empty')
];
