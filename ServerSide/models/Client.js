const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const clientSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    firstName: {
        type: String,
        required: true
    },
    secondName: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    activestatus: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true
}
)
clientSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id: 'tickerNums',
    start_seq: 500
})
module.exports = mongoose.model('Client', clientSchema) 