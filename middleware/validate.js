const { body, validationResult } = require('express-validator');

const eventValidationRules = () => {
    return [
        body('eventCode')
            .notEmpty().withMessage('Event code is required')
            .isString().withMessage('Event code must be a string')
            .trim(),
        body('title')
            .notEmpty().withMessage('Title is required')
            .isString().withMessage('Title must be a string')
            .trim(),
        body('date')
            .notEmpty().withMessage('Date is required')
            .isISO8601().withMessage('Date must be in ISO 8601 format (YYYY-MM-DD)'),
        body('venue')
            .notEmpty().withMessage('Venue is required')
            .isString().withMessage('Venue must be a string')
            .trim(),
        body('city')
            .notEmpty().withMessage('City is required')
            .trim(),
        body('country')
            .notEmpty().withMessage('Country is required')
            .trim(),
        body('broadcastNetwork')
            .notEmpty().withMessage('Broadcast network is required')
            .trim()
        
    ];
};

const fightValidationRules = () => {
    return [
        body('fighterOne')
            .notEmpty().withMessage('Fighter One is required')
            .isString().withMessage('Fighter One must be a string')
            .trim(),
        body('fighterTwo')
            .notEmpty().withMessage('Fighter Two is required')
            .isString().withMessage('Fighter Two must be a string')
            .trim(),
        body('weightClass')
            .notEmpty().withMessage('Weight class is required')
            .trim(),
        body('mainEvent')
            .notEmpty().withMessage('Main event is required')
            .isBoolean().withMessage('Main event must be a true or false'),
        body('weightLimitLbs')
            .notEmpty().withMessage('Weight limit in pounds is required')
            .isInt({ min: 50}).withMessage('Weight limit must be an integer greater than or equal to 50'),
        body('tags')            .isArray().withMessage('Tags must be an array of strings')
            .optional()
            .isArray().withMessage('Tags must be an array of strings')
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors,
    });
}; 

module.exports = {
    eventValidationRules,
    fightValidationRules, 
    validate
};