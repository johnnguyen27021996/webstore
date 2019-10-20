const dbProduct = require('../../models/product.model');

exports.getHome = (req, res)=>{
    dbProduct.find({}, (err, doc)=>{
        res.render('index/index', {
            products: doc
        });
    })
}

exports.getAbout = (req, res)=>{
    res.render('index/about');
}

exports.getContact = (req, res)=>{
    res.render('index/contact');
}