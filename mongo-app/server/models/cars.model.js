const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// importing required libraries

const CarSchema = new Schema({
    // creation of a new mongoose schema 
    model: {
        type: 'String',
        required: true
    },
    make: {
        type: 'String',
        required: true
    },
    registration: {
        type: 'String',
        required: true
    },
    date: {
        type: 'String',
        required: true
    },
    age: {
        type: 'Number',
        required: true
    },

    owner: {
        type: 'String',
        required: true
    }
    // declaring data types and dependencies
})

const Car = mongoose.model('Cars', CarSchema);
// turning the schema into a const

module.exports = Car;
// exporting the const