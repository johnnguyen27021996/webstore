const router = require('express').Router();
const controller = require('../controllers/order');

var islog = (req, res, next)=>{
    if(!req.session.username){
        res.redirect('/admin');
    }else{
        next();
    }
}

router.get('/', islog, controller.getAllOrder);
router.get('/p=(:page)?', islog, controller.getAllOrder);

module.exports = router;