const userModel = require("../models/user-model")
const bcrypt = require("bcrypt")
const { validationResult } = require('express-validator');
const {generateToken, validateToken} = require("../utils/Helper");

module.exports.submitRegistration = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
        status: 0,
        message: "Validation failed",
        errors: errors.array(),
        });
    }

    try{
        const bodyData = req.body;
        const password = bodyData?.password;
        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);
        const userCount = await userModel.where({$or: [{email: bodyData?.email}, {phone: bodyData?.phone}]}).countDocuments();
        if(userCount>0){
            return res.json({status: 409, message: "User already exists!"});
        }else{
            const data = await userModel.create({
                name: bodyData?.name,
                email: bodyData?.email,
                phone: bodyData?.phone,
                password: hashedPassword
            })

            const token = generateToken({
                name: bodyData?.name,
                email: bodyData?.email,
                phone: bodyData?.phone
            })
        
            res.json({
                status:1,
                message: "successful",
                token
            })
        }
        
    }catch(err){
        res.json({status:0, message: err?.message})
    }
    
}

module.exports.checkAuthToken = async (req, res, next) => {

    const bearer = req.headers['authorization'];
    const token = bearer.split(' ')[1];
    const result = validateToken(token)
    res.json(result)
}

module.exports.loginSubmit = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
        status: 0,
        message: "Validation failed",
        errors: errors.array(),
        });
    }

    try{
        const bodyData = req.body;
        const userDetails = await userModel.findOne({email: bodyData?.email});
        if(userDetails?.password){
            const isMatch = await bcrypt.compare(bodyData?.password, userDetails?.password);
            if(isMatch){
                const token = generateToken({
                    name: userDetails?.name,
                    email: userDetails?.email,
                    phone: userDetails?.phone
                })

                return res.json({
                            status:1,
                            message: "Successfully logged in",
                            token
                        })
            }
        }
        
        return res.json({status:0})
        
        
    }catch(err){
        res.json({status:0, message: err?.message})
    }


    
}