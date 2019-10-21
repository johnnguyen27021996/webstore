const moment = require('moment');
const dbRate = require('../models/rate.model');

exports.getAllRate = (req, res) => {
    let limit = 10, skip = 0, totalpage = 0,
        page = parseInt(req.params.page) - 1;
    skip = limit * page;
    dbRate.find({}).populate('productID').limit(limit).skip(skip).exec((err, doc) => {
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