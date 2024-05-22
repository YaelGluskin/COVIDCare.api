const mongoose = require('mongoose')
const clientSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: true
    },
    clientLastName: {
        type: String,
        required: true
    },
    clientID: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
    },
    cellPhoneNumber: {
        type: String,
        required: true,
    },
    telephoneNumber: {
        type: String,
        required: true,
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
    birthDate: {
        type: Date,
        required: true
    },
    nunOfVaccine: {
        type: Number,
        required: false,
        default: 0
    },
    Infected: {
        type: Boolean,
        require: false,
        default: false
    }
});

module.exports = mongoose.model('Client', clientSchema) 

