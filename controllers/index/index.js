const dbProduct = require('../../models/product.model');
const dbRate = require('../../models/rate.model');

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

exports.getDetailOneProduct = (req, res)=>{
    let id = req.params.id, avgstar = 0, totalstar = 0;
    dbProduct.findById(id).exec((err, product)=>{
        dbRate.find({productID: id}).exec((err, rates)=>{
            dbRate.find({productID: id}).countDocuments((err, count)=>{
                rates.forEach(item=>{
                    totalstar += parseInt(item.star);
                })
                avgstar = parseFloat(totalstar/count).toFixed(1);
                res.render('index/detailoneproduct', {
                    product: product,
                    rates: rates,
                    avgstar: avgstar
                })
            })
        })
    })
}