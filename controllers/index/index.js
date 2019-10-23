const dbProduct = require('../../models/product.model');
const dbRate = require('../../models/rate.model');
const dbOrder = require('../../models/order.model');
const payment = require('../../src/paypal/paypal');

exports.getHome = (req, res) => {
    dbProduct.find({}, (err, doc) => {
        res.render('index/index', {
            products: doc,
            cart: req.session.cart
        });
    })
}

exports.getAbout = (req, res) => {
    res.render('index/about', {
        cart: req.session.cart
    });
}

exports.getContact = (req, res) => {
    res.render('index/contact', {
        cart: req.session.cart
    });
}

exports.getDetailOneProduct = (req, res) => {
    let id = req.params.id, avgstar = 0, totalstar = 0;
    dbProduct.findById(id).exec((err, product) => {
        dbRate.find({ productID: id }).exec((err, rates) => {
            dbRate.find({ productID: id }).countDocuments((err, count) => {
                rates.forEach(item => {
                    totalstar += parseInt(item.star);
                })
                avgstar = parseFloat(totalstar / count).toFixed(1);
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

exports.getCart = (req, res) => {
    res.render('index/cart', {
        cart: req.session.cart,
        notice: req.flash('notice')
    })
}

exports.addToCart = (req, res) => {
    let productID = req.body.id;
    dbProduct.findById(productID).exec((err, doc) => {
        if (!req.session.cart) {
            req.session.cart = [{
                product: doc,
                quantity: 1
            }]
        } else {
            let index = -1;
            for (let i = 0; i < req.session.cart.length; i++) {
                if (req.session.cart[i].product._id == productID) {
                    index = i;
                    break;
                }
            }
            if (index == -1) {
                req.session.cart.push({
                    product: doc,
                    quantity: 1
                })
            } else {
                req.session.cart[index].quantity += 1;
            }
        }
        req.session.save();
        res.render('index/cartitem-template', {
            cart: req.session.cart
        })
    })
}

exports.changeQuantityCart = (req, res) => {
    let id = req.body.id,
        quantity = req.body.quantity;
    for (let i = 0; i < req.session.cart.length; i++) {
        if (req.session.cart[i].product._id == id) {
            if (quantity == 0) {
                req.session.cart.splice(i, 1);
            } else {
                req.session.cart[i].quantity = quantity;
            }
        }
    }
    res.render('index/cartbody-template', {
        cart: req.session.cart
    })
}

exports.getCheckOut = (req, res) => {
    let total = 0;
    if (!req.session.cart || req.session.cart == '') {
        total = 0;
    } else {
        req.session.cart.forEach(item => {
            total += parseInt(item.product.price) * parseInt(item.quantity);
        })
    }
    res.render('index/checkout', {
        cart: req.session.cart,
        total: total
    })
}

exports.postCheckOut = (req, res) => {
    let productID = [],
        name = req.body.name,
        email = req.body.email,
        phone = req.body.phone,
        amount = req.body.amount,
        paytype = req.body.payment;
    if (amount == 0) {
        res.redirect('/cart');
    } else {
        var newOrder = new dbOrder();
        req.session.cart.forEach(item => {
            productID.push({
                id: item.product._id,
                quantity: item.quantity
            });
        })
        newOrder.productID = productID;
        newOrder.nameCustomer = name;
        if (email != '') {
            newOrder.emailCustomer = email;
        }
        if (phone != '') {
            newOrder.phoneCustomer = phone;
        }
        newOrder.payType = paytype;
        newOrder.amount = amount;
        newOrder.save((err) => {
            if (!err) {
                if (paytype == 'offline') {
                    delete req.session.cart;
                    req.flash('notice', 'Order Success');
                    res.redirect('/cart')
                } else {
                    payment(res, req.session.cart, amount);
                }
            }
        })
    }
}

const getpayment = require('../../src/paypal/getdatasuccesss');

exports.successsPayment = (req, res) => {
    let paymentID = req.query.paymentId,
        payer_id = req.query.PayerID,
        total = 0;
    req.session.cart.forEach(item => {
        total += parseInt(item.product.price) * parseInt(item.quantity);
    })
    getpayment(res, paymentID, payer_id, total);
}

exports.cancelPayment = (req, res) => {
    res.send('cancel');
}