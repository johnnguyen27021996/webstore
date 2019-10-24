const url = require('url');
const dbOrder = require('../../models/order.model');
const paypal = require('paypal-rest-sdk')

paypal.configure({
    'mode': 'sandbox', //sandbox or live 
    'client_id': process.env.PAYPAL_CLIENT_ID,
    'client_secret': process.env.PAYPAL_CLIENT_SECRET
})

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
        location = req.body.location,
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
        newOrder.location = location;
        newOrder.payType = paytype;
        newOrder.amount = amount;
        if (paytype == 'offline') {
            newOrder.save();
            delete req.session.cart;
            req.flash('notice', 'Order Success');
            res.redirect('/cart');
        } else {
            var item = [];

            if (req.session.cart && req.session.cart != '') {
                req.session.cart.forEach(product => {
                    item.push({
                        "name": product.product.name,
                        "sku": product.product._id,
                        "price": product.product.price,
                        "currency": "USD",
                        "quantity": product.quantity
                    })
                })
            }
            var create_payment_json = {
                "intent": "sale",
                "payer": {
                    "payment_method": "paypal"
                },
                "redirect_urls": {
                    "return_url": "http://localhost:3000/successpayment",
                    "cancel_url": "http://localhost:3000/cancelpayment"
                },
                "transactions": [{
                    "item_list": {
                        "items": item
                    },
                    "amount": {
                        "currency": "USD",
                        "total": amount
                    }
                }]
            };

            paypal.payment.create(create_payment_json, function (error, payment) {
                if (error) {
                    throw error;
                } else {
                    newOrder.payID = payment.id;
                    payment.links.forEach(item => {
                        if (item.rel == 'approval_url') {
                            let newUrl = url.parse(item.href, true);
                            let token = newUrl.query.token;
                            newOrder.payToken = token;
                            newOrder.save();
                            res.redirect(item.href);
                        }
                    })
                }
            });

        }
    }
}

exports.successsPayment = (req, res) => {
    let paymentID = req.query.paymentId;

    // let payer_id = req.query.PayerID,
    //     total = 0;
    // req.session.cart.forEach(item => {
    //     total += parseInt(item.product.price) * parseInt(item.quantity);
    // })

    // var execute_payment_json = {
    //     "payer_id": payer_id,
    //     "transactions": [{
    //         "amount": {
    //             "currency": "USD",
    //             "total": total
    //         }
    //     }]
    // };

    // var paymentId = paymentID;

    // paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    //     if (error) {
    //         console.log(error.response);
    //         throw error;
    //     } else {
    //         console.log(payment);
    //     }
    // });

    dbOrder.findOne({payID: paymentID}).exec((err, doc)=>{
        doc.payStatus = true;
        doc.payToken = undefined;
        doc.save();
        delete req.session.cart;
        req.flash('notice', 'Order Success');
        res.redirect('/cart');
    })
}

exports.cancelPayment = (req, res) => {
    let token = req.query.token;
    dbOrder.findOneAndDelete({payToken:token}).exec((err, doc)=>{
        req.flash('notice', 'Order Canceled');
        res.redirect('/cart');
    })
}