const { body } = require('express-validator');

exports.authValidation = [
    body('name').notEmpty(),
    body('email').notEmpty(),
    body('phone').notEmpty(),
    body('password').notEmpty(),
]

exports.loginValidation = [
    body('email').notEmpty(),
    body('password').notEmpty(),
]