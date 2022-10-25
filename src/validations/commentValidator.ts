import {body} from "express-validator"
import reportError from './reportErrorValidation';

export const validateCreateComment= [
    body('body').exists().withMessage('Must provide a body'),
    body('newId').exists().withMessage('Must provide a newsId'),
    reportError
];

export default{
    validateCreateComment
}