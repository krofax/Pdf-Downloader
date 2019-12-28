const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const registerSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
    {timestamps: true}
)

module.exports = mongoose.model('User', registerSchema);