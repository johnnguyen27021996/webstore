const mongoose = require('mongoose');
module.exports = ()=>{
    mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    });
    var db = mongoose.connection;
    db.on('open', console.error.bind(console, 'ERROR'));
    db.once('open', ()=>{
        console.log('Connecting ...');
    })
}