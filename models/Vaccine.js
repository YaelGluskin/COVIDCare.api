const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
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
},
{
    timestamps: true
}
);
vaccineSchema.plugin(AutoIncrement, {
    inc_field: 'vacinneClients',
    id: 'vaccineNums',
    start_seq: 1
})
module.exports =  mongoose.model('Vaccine', vaccineSchema)