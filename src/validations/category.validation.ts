import { param } from 'express-validator';

export const deleteValidator = [
  param('id', 'Invalid id').exists().isInt(),
];

export const getDetailsValidator = [
  param('id', 'Invalid id').exists().isInt(),
];
