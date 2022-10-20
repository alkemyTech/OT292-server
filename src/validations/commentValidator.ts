import {body} from "express-validator"

export const validateCreateComment= [
    body('body').exists().withMessage('Must provide a body'),
    body('newsId').exists().withMessage('Must provide a newsId')
]

export default{
    validateCreateComment
}