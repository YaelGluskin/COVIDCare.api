const mongoose = require('mongoose')

const vaccineSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client', // Reference to the Client model
        required: true
    }
});
module.exports =  mongoose.model('Vaccine', vaccineSchema);
