import {body} from "express-validator"
import reportError from "./reportErrorValidation"

export const validateCreateComment= [
    body('body').exists().withMessage('Must provide a body'),
    body('newsId').exists().withMessage('Must provide a newsId')
]

export const validateUpdateComment = [
    body('id').exists().withMessage('Must provide a commentId'),
    body('body').exists().withMessage('Must provide a body'),
    reportError
]

export default{
    validateCreateComment,
    validateUpdateComment
}