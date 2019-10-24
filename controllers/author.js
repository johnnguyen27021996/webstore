const dbMember = require('../models/member.model');

exports.getLogin = (req, res)=>{
    res.render('login', {
        error: req.flash('error')
    })
}

exports.postLogin = (req, res)=>{
    let username = req.body.username,
        password = req.body.password;
    dbMember.findOne({username: username}, (err, doc)=>{
        if(!doc){
            req.flash('error', 'Tai khoan khong ton tai');
            res.redirect('/admin');
        }else{
            if(doc.password != password){
                req.flash('error', 'Mat khau khong chinh xac');
                res.redirect('/admin');
            }else{
                req.session.username = username;
                res.redirect('/dashboard');
            }
        }
    })
}

exports.getLogout = (req, res)=>{
    delete req.session.username;
    res.redirect('/admin');
}