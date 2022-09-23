import { param } from 'express-validator';

export const deleteValidator = [
  param('id', 'Invalid id').exists().isInt(),
];
