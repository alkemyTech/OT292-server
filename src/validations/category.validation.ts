import { param } from 'express-validator';

export const getDetailsValidator = [
  param('id', 'Invalid id').exists().isInt(),
];
