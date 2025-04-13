require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000
const allRoutes = require("./routes")
var cors = require('cors');
const connectDB = require("./config/db-config")
var bodyParser = require('body-parser')


var corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 
  }
  
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors(corsOptions))

connectDB();

app.use('/api', allRoutes);

app.listen(PORT, ()=>{
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
})