const mongoose = require('mongoose');


async function connectDB() {
    try{
        await mongoose.connect('mongodb://localhost:27017/local');
        console.log("MongoDB connected successfully!");
    }catch(err){
        console.log(err.message);
    }
}

module.exports = connectDB;
