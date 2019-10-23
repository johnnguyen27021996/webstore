const router = require('express').Router();
const controller = require('../../controllers/index/index');

router.get('/', controller.getHome);

router.get('/about', controller.getAbout);

router.get('/contact', controller.getContact);

router.get('/detailproduct/:id', controller.getDetailOneProduct);

router.get('/cart', controller.getCart);

router.post('/addtocart', controller.addToCart);

router.post('/changequantitycart', controller.changeQuantityCart);

router.get('/checkout', controller.getCheckOut);

router.post('/checkout', controller.postCheckOut);

router.get('/successpayment', controller.successsPayment);


router.get('/cancelpayment', controller.cancelPayment);

module.exports = router;