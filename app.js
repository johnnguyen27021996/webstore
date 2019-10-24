const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const app = express();

const session = require('./src/session/session');
const database = require('./src/database/database');

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session);
app.use(flash());

database();

app.use('/', require('./routers/index/index'));
app.use('/', require('./routers/index/payment'));

app.use('/admin', require('./routers/author'));
app.use('/dashboard', require('./routers/dashboard'));
app.use('/product', require('./routers/product'));
app.use('/rate', require('./routers/rate'));
app.use('/order', require('./routers/order'));

app.listen(process.env.PORT || process.env.port, () => {
    console.log('Running ...');
})
module.exports = app;