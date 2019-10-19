const mognoose = require('mongoose');
const Shema = mognoose.Schema;
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
    thumbnails: []
})
module.exports = mognoose.model('products', newProduct);