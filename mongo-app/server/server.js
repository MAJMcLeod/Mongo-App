require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// importing required libraries

const app = express();
const PORT = 3001 || process.env.PORT || 3000;
const uri = process.env.DB_URI;
// initializing required variables to make the API run

app.use(express.json());
app.use(cors())
// specifying what the express app will use

mongoose.connect(uri);
const connect = mongoose.connection;
// establishing a connection with the mongoDB database, the uri
// is stored in a .env file

connect.once('open', () => {
    console.log("database connection established");
    // once the connection has been established and verified
    // print out a message
})

const carsRouter = require('./routes/cars');
app.use('/cars', carsRouter);
// imports the carRouter which is an extension of the API and is 
// crucial for execution of CRUD operations on the database

app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
})
// app is listening on PORT variable