import { param, query } from 'express-validator';

export const deleteValidator = [
  param('id', 'Invalid id').exists().isInt(),
];

export const getDetailsValidator = [
  param('id', 'Invalid id').exists().isInt(),
];

export const listValidator = [
  query('offset', 'Invalid offset').optional().isInt(),
  query('limit', 'Invalid limit').optional().isInt(),
];
