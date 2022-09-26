import { body, param } from 'express-validator';

export const deleteValidator = [
  param('id', 'Invalid id').exists().isInt(),
];

export const getDetailsValidator = [
  param('id', 'Invalid id').exists().isInt(),
];

export const createValidator = [
  body('name', 'Invalid name').exists().isString(),
  body('description', 'Invalid description').optional().isString(),
];
