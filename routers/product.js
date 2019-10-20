const router = require('express').Router();
const controller = require('../controllers/product');
const upload = require('../src/multer/multer')('public/images/product/');

var islog = (req, res, next)=>{
    if(!req.session.username){
        res.redirect('/admin');
    }else{
        next();
    }
}

router.get('/', islog, controller.getAllProduct);

router.get('/p=(:page)?', islog, controller.getAllProduct);

router.get('/add', islog, controller.addProduct);

router.post('/add', islog, upload.any('thumbnail'), controller.addNewProduct);

router.get('/edit/:id', islog, controller.getEditProduct);

router.post('/edit/:id', islog, upload.any('thumbnail'), controller.postEditProduct);

router.get('/delete/:id', islog, controller.getDeleteProduct);

module.exports = router;