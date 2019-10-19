const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var newRate = new Schema({
    productID: {
        type: Schema.Types.ObjectId,
        ref: 'products'
    },
    star: {
        type: String,
        required: true
    },
    comment: {
        type: String
    },
    createBy: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})
module.exports = mongoose.model('rates', newRate);