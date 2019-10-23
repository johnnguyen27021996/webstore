module.exports = (res, paymentID, payer_id, total) => {
    const paypal = require('paypal-rest-sdk');

    paypal.configure({
        'mode': 'sandbox', //sandbox or live 
        'client_id': process.env.PAYPAL_CLIENT_ID,
        'client_secret': process.env.PAYPAL_CLIENT_SECRET
    })

    var execute_payment_json = {
        "payer_id": payer_id,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": total
            }
        }]
    };

    var paymentId = paymentID;

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log("Get Payment Response");
            console.log(JSON.stringify(payment));
        }
    });

}