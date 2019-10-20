const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var newShip = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('ships', newShip);