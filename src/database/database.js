const mongoose = require('mongoose');
module.exports = ()=>{
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    });
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'ERROR'));
    db.once('open', ()=>{
        console.log('Connecting ...');
    })
}