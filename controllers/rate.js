const moment = require('moment');
const dbRate = require('../models/rate.model');

exports.getAllRate = (req, res) => {
    let limit = 10, skip = 0, totalpage = 0,
        page = (!req.params.params) ? 0 : parseInt(req.params.page) - 1;
    skip = limit * page;
    // dbRate.find({}).populate('productID').limit(limit).skip(skip).exec((err, doc) => {
    //     dbRate.countDocuments((err, count) => {
    //         totalpage = Math.ceil(count / limit);
    //         res.render('rate/allrate', {
    //             rates: doc,
    //             pagination: totalpage
    //         })
    //     })
    // })
    dbRate.aggregate(
        [
            {
                $project: {
                    _id: 1,
                    productID: 1,
                    star: 1,
                    comment:1,
                    createBy: 1,
                    createAt: {
                        $dateToString: {
                            format: '%H:%M %d-%m-%Y',
                            date: '$createAt',
                            timezone: '+07:00'
                        }
                    }
                }
            }, 
            {
                $lookup: {
                    from: "products",
                    localField: "productID",
                    foreignField: "_id",
                    as: "populate_product"
                }
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            }
        ]
    ).exec((err, doc)=>{
        dbRate.countDocuments((err, count) => {
            totalpage = Math.ceil(count / limit);
            res.render('rate/allrate', {
                rates: doc,
                pagination: totalpage
            })
        })
    })
}

exports.addNewRate = (req, res)=>{
    let productID = req.body.id,
        star = req.body.star,
        customername = req.body.customername,
        comment = req.body.comment;
    var newRate = new dbRate({
        productID: productID,
        star: star,
        comment: comment,
        createBy: customername
    })
    newRate.save((err)=>{
        if(!err){
            res.send('1');
        }
    })
}

exports.getDeleteRate = (req, res)=>{
    let id = req.params.id;
    dbRate.findByIdAndDelete(id).exec((err, doc)=>{
        res.redirect('/rate');
    })
}