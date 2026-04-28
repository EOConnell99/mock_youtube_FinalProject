import { param, body, oneOf, query } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';
export const validateId = [
    param('id')
        .trim()
        .escape()
        .isInt({ min: 1 })
        .withMessage(`Id must be a positive integer`),

    handleValidationErrors,
];

export const validateCreateComment = [
    body('content')
        .exists({ values: 'falsy' })
        .withMessage('Comment must exist.')
        .bail()
        .trim()
        .escape()
        .isString()
        .withMessage('Comment must be a string')
        .bail()
        .isLength({ min: 10 })
        .withMessage('Comment must be at least 10 characters'),

    handleValidationErrors,
];

export const validateUpdateComment = [
    body('content')
        .exists({ values: 'falsy' })
        .withMessage('Comment must exist.')
        .bail()
        .trim()
        .escape()
        .isString()
        .withMessage('Comment must be a string')
        .bail()
        .isLength({ min: 10 })
        .withMessage('Comment must be at least 10 characters'),

    handleValidationErrors,
];