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

// Public directory
app.use(express.static('public'));

//Routes
app.use('/api/users', require('./routes/users.route'));
app.use('/api/login', require('./routes/auth.route'));
app.use('/api/hospitals', require('./routes/hospitals.route'));
app.use('/api/doctors', require('./routes/doctors.route'));
app.use('/api/all', require('./routes/search.route'));
app.use('/api/uploads', require('./routes/uploads.route'));

//Run app
app.listen(process.env.PORT, () => {
    console.log("server " + process.env.PORT )
})