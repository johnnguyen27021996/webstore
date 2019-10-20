const router = require('express').Router();
const controller = require('../controllers/rate');

var islog = (req, res, next)=>{
    if(!req.session.username){
        res.redirect('/admin');
    }else{
        next();
    }
}

router.get('/', islog, controller.getAllRate);

router.get('/p=(:page)?', islog, controller.getAllRate);

router.get('/delete/:id', islog, controller.getDeleteRate);

module.exports = router;