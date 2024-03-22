const mongoose = require('mongoose')
const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    telephone_number: {
        type: String,
        required: true,
        unique: true
    },
    phone_number: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        city: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        house_number: {
            type: String,
            required: true
        }
    },
    birth_date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Client', clientSchema) 

