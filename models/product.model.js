const mognoose = require('mongoose');
const Schema = mognoose.Schema;
var newProduct = new Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    thumbnails: [],
    currency: {
        type: String,
        required: true
    }
})
module.exports = mognoose.model('products', newProduct);