const express = require("express");
const router = express.Router();
const {submitRegistration, checkAuthToken, loginSubmit} = require("../../controllers/auth-controllers")
const {authValidation, loginValidation} = require("../../validations/auth-validations")

router.post('/submit-registration', authValidation, submitRegistration);
router.post('/check-auth', checkAuthToken);
router.post('/login-submit', loginValidation, loginSubmit)

module.exports = router;