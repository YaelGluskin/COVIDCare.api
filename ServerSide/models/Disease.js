const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const diseaseSchema = new mongoose.Schema({
    datePositive: {
        type: Date,
        required: true
    },
    dateRecovery: {
        type: Date,
        required: false
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client', // Reference to the Client model
        required: true
    }
});
diseaseSchema.plugin(AutoIncrement, {
    inc_field: 'diseaseClients',
    id: 'diseaseNums',
    start_seq: 0
})
module.exports =  mongoose.model('Disease', diseaseSchema)