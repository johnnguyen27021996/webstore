const dbProduct = require('../../models/product.model');
const dbRate = require('../../models/rate.model');

exports.getHome = (req, res)=>{
    dbProduct.find({}, (err, doc)=>{
        res.render('index/index', {
            products: doc,
            cart: req.session.cart
        });
    })
}

exports.getAbout = (req, res)=>{
    res.render('index/about', {
        cart: req.session.cart
    });
}

exports.getContact = (req, res)=>{
    res.render('index/contact', {
        cart: req.session.cart
    });
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
                    avgstar: avgstar,
                    cart: req.session.cart
                })
            })
        })
    })
}

exports.getCart = (req, res)=>{
    res.render('index/cart', {
        cart: req.session.cart
    })
}

exports.addToCart = (req, res)=>{
    let productID = req.body.id;
    dbProduct.findById(productID).exec((err, doc)=>{
        if(!req.session.cart){
            req.session.cart = [{
                product: doc, 
                quantity: 1
            }]
        }else{
            let index = -1;
            for(let i=0; i<req.session.cart.length; i++){
                if(req.session.cart[i].product._id == productID){
                    index = i;
                    break;
                }
            }
            if(index == -1){
                req.session.cart.push({
                    product: doc,
                    quantity: 1
                })
            }else{
                req.session.cart[index].quantity += 1;
            }
        }
        req.session.save();
        res.render('index/cartitem-template', {
            cart: req.session.cart
        })
    })  
}

exports.changeQuantityCart = (req, res)=>{
    let id = req.body.id,
        quantity = req.body.quantity;
    for(let i=0; i<req.session.cart.length; i++){
        if(req.session.cart[i].product._id == id){
            if(quantity == 0){
                req.session.cart.splice(i, 1);
            }else{
                req.session.cart[i].quantity = quantity;
            }
        }
    }
    res.render('index/cartbody-template', {
        cart: req.session.cart
    })
}