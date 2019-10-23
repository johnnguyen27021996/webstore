const router = require('express').Router();
const controller = require('../../controllers/index/index');

router.get('/', controller.getHome);

router.get('/about', controller.getAbout);

router.get('/contact', controller.getContact);

router.get('/detailproduct/:id', controller.getDetailOneProduct);

router.get('/cart', controller.getCart);

router.post('/addtocart', controller.addToCart);

router.post('/changequantitycart', controller.changeQuantityCart);

module.exports = router;