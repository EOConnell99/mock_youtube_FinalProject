import { param, body, oneOf, query } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateId = [
    param('id')
        .trim()
        .escape()
        .isInt({ min: 1 })
        .withMessage('Id must be a positive integer'),

    handleValidationErrors,
];

export const validateCreatePost = [
    body('name')
        .exists({ values: 'falsy' })
        .withMessage('Name is required')
        .bail()
        .trim()
        .escape()
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters'),

    body('desc')
        .exists({ values: 'falsy' })
        .withMessage('Description is required')
        .bail()
        .trim()
        .escape()
        .isString()
        .withMessage('Content must be a string')
        .bail()
        .isLength({ min: 10 })
        .withMessage('Content must be at least 10 characters'),

    handleValidationErrors,
];