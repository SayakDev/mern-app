const express = require("express");
const router = express.Router();
const authRouter = require("./auth/auth-routes")
const crudRouter = require("./crud/crud-routes")

router.use('/auth', authRouter);
router.use('/', crudRouter);


module.exports = router;