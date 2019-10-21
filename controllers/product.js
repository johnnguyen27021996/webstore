const dbProduct = require('../models/product.model');
const fs = require('fs');

exports.getAllProduct = (req, res) => {
    let limit = 10, skip = 0, totalpage = 0,
        page = parseInt(req.params.page) - 1;
    skip = limit * page;
    dbProduct.find({}).limit(limit).skip(skip).exec((err, doc) => {
        dbProduct.countDocuments((err, count) => {
            totalpage = Math.ceil(count / limit);
            res.render('product/allproduct', {
                products: doc,
                pagination: totalpage
            })
        })
    })
}

exports.addProduct = (req, res) => {
    res.render('product/addproduct');
}

exports.addNewProduct = (req, res) => {
    let name = req.body.name,
        price = req.body.price,
        description = req.body.description,
        currency = req.body.currency,
        thumbnail = [],
        upload = req.files;
    dbProduct.findOne({ name: name }, (err, doc) => {
        if (doc) {
            res.redirect('/product/add');
        } else {
            let newProduct = new dbProduct();
            newProduct.name = name;
            newProduct.price = price;
            newProduct.description = description;
            newProduct.currency = currency;
            if (upload != undefined) {
                upload.forEach(item => {
                    thumbnail.push(item.filename);
                });
                newProduct.thumbnails = thumbnail;
            }
            newProduct.save((err) => {
                if (!err) {
                    res.redirect('/product');
                }
            })
        }
    })
}

exports.getEditProduct = (req, res) => {
    let id = req.params.id;
    dbProduct.findById(id).exec((err, doc) => {
        res.render('product/editproduct', {
            product: doc
        })
    })
}

exports.postEditProduct = (req, res) => {
    let id = req.params.id,
        name = req.body.name,
        price = req.body.price,
        description = req.body.description,
        currency = req.body.currency,
        thumbnail = [],
        upload = req.files;
    dbProduct.findById(id).exec((err, doc) => {
        if (name != '') {
            doc.name = name;
        }
        if (price != '') {
            doc.price = price;
        }
        if (description != '') {
            doc.description = description;
        }
        if (currency != '') {
            doc.currency = currency
        }
        if (upload != undefined) {
            doc.thumbnails.forEach(ditem => {
                fs.unlink('public/images/product/' + ditem, function () { });
            })
            upload.forEach(item => {
                thumbnail.push(item.filename);
            });
            doc.thumbnails = thumbnail;
        }
        doc.save((err) => {
            if (!err) {
                res.redirect('/product');
            }
        })
    })
}

exports.getDeleteProduct = (req, res) => {
    let id = req.params.id;
    dbProduct.findByIdAndDelete(id).exec((err, doc) => {
        doc.thumbnails.forEach(item => {
            fs.unlink('public/images/product/' + item, function () { });
        })
        res.redirect('/product');
    })
}