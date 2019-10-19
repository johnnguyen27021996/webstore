const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var newMember = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    }
})

module.exports = mongoose.model('members', newMember);