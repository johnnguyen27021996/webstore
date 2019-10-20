const router = require('express').Router();

var islog = (req, res, next)=>{
    if(!req.session.username){
        res.redirect('/admin');
    }else{
        next();
    }
}

router.get('/', islog, (req, res)=>{
    res.render('dashboard');
});

module.exports = router;