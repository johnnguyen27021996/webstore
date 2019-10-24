const dbOrder = require('../models/order.model');

exports.getAllOrder = (req, res) => {
    dbOrder.aggregate(
        [
            {
                $project: {
                    productID: 1,
                    amount: 1,
                    nameCustomer: 1,
                    emailCustomer: 1,
                    phoneCustomer: 1,
                    location: 1,
                    payID: 1,
                    payType: 1,
                    payStatus: 1,
                    bookAt: { $dateToString: { format: "%H:%M %d-%m-%Y", date: "$bookAt", timezone: "+07:00"} }
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField:"productID.id",
                    foreignField: "_id",
                    as: "product_doc"
                }
            }
        ]
    ).exec((err, doc) => {
        console.log(doc[0].product_doc);
    })
}