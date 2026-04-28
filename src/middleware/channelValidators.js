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

export const validateCreateChannel = [
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
        .withMessage('Desc must be a string')
        .bail()
        .isLength({ min: 10 })
        .withMessage('Desc must be at least 10 characters'),

    handleValidationErrors,
];

export const validateUpdateChannel = [
    oneOf(
        [
            body('name').exists({ values: 'falsy' }),
            body('desc').exists({ values: 'falsy' }),
        ],
        { message: 'At least one field (name, desc) must be provided' },
    ),

    body('name')
        .optional()
        .trim()
        .escape()
        .isString()
        .withMessage('Name must be a string')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters'),

    body('desc')
        .optional()
        .trim()
        .escape()
        .isString()
        .withMessage('Desc must be a string')
        .bail()
        .isLength({ min: 10 })
        .withMessage('Desc must be at least 10 characters'),

    handleValidationErrors,
];