const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var newOrder = new Schema({
    productID: [
        {
            id:{
                type: Schema.Types.ObjectId,
                ref: 'products'
            },
            quantity: {
                type: String,
                require: true
            }
        }
    ],
    amount: {
        type: String,
        require: true
    },
    nameCustomer: {
        type: String,
        required: true
    },
    emailCustomer: {
        type: String,
    },
    phoneCustomer: {
        type: String
    },
    // shipID: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'ships'
    // },
    payType: {
        type: String,
        required: true
    },
    payStatus: {
        type: Boolean,
        default: false
    },
    bookAt: {
        type: Date,
        default: Date.now()
    }
})
module.exports = mongoose.model('orders', newOrder);