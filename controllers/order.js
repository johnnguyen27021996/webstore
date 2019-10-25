const dbOrder = require('../models/order.model');

exports.getAllOrder = (req, res) => {
    let limit = 10, skip = 0, totalpage = 0,
        page = (!req.params.page) ? 0 : parseInt(req.params.page) - 1;
    skip = limit*page;
    dbOrder.find().limit(limit).skip(skip).exec((err, doc)=>{
        dbOrder.countDocuments((err, count)=>{
            totalpage = Math.ceil(count/limit);
            res.render('order/allorder', {
                orders: doc,
                pagination: totalpage
            })
        })
    })
}