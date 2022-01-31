const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

require('dotenv').config();

//Create express server 
const app = express();

//CORS Config
app.use(cors());

// Read & parse body
app.use(express.json());

//DB
dbConnection();

//Routes
app.use('/api/users', require('./routes/users.route'));
app.use('/api/login', require('./routes/auth.route'));

//Run app
app.listen(process.env.PORT, () => {
    console.log("server " + process.env.PORT )
})