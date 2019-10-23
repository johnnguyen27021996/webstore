module.exports = (res, cart, total, paymentId, payer_id)=>{

    const paypal = require('paypal-rest-sdk');

    paypal.configure({
        'mode': 'sandbox', //sandbox or live 
        'client_id': process.env.PAYPAL_CLIENT_ID,
        'client_secret': process.env.PAYPAL_CLIENT_SECRET
    })

    var item = [];

    if(!cart || cart == ''){
        res.redirect('/cart');
    }else{
        cart.forEach(product => {
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
                "total": total
            }
        }]
    };
    
    
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            payment.links.forEach(item => {
                if(item.rel == 'approval_url'){
                    res.redirect(item.href);
                }
            })
        }
    });

}