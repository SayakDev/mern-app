const express = require("express");
const router = express.Router();
const {submitCrud} = require("../../controllers/crud-controller.js")
const {generateToken, validateToken} = require("../../utils/Helper");
const multer  = require('multer')

const upload = multer({ dest: 'uploads/' })

router.use((req, res, next) => {
    console.log('Time:', Date.now())
    const bearer = req.headers['authorization'];
    const token = bearer.split(' ')[1];
    console.log(token)
    const result = validateToken(token)
    if(result.status!==1){
        return res.status(401).json({success:false, message: "Unauthenticated"})
    }
    next()
})

router.post('/submit-crud', upload.single('document'), submitCrud);

module.exports = router;