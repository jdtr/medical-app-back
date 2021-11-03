const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

require('dotenv').config();

//CORS Config
app.use(cors());

//Create express server 
const app = express();

//DB
dbConnection();

app.listen(process.env.PORT, () => {
    console.log("server " + process.env.PORT )
})