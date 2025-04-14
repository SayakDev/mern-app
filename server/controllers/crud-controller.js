const crudModel = require("../models/crud-model.js")

module.exports.submitCrud = async (req, res, next) => {
    console.log(req.file)
    await crudModel.create({
        email: req?.body?.email,
        password: req?.body?.password,
        document: req?.file?.path || null
    })
    res.json({
        success: true,
        message: "Submitted successfully"
    })
}