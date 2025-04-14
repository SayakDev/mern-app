const mongoose = require("mongoose");

const crudSchema = new mongoose.Schema({
  email: String,
  password: String,
  document: {type: String, default: null}
});

const crudModel = mongoose.model('cruds', crudSchema);

module.exports = crudModel;
