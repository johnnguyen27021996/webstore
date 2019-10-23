const router = require('express').Router();
const controller = require('../../controllers/index/payment');

router.get('/checkout', controller.getCheckOut);

router.post('/checkout', controller.postCheckOut);

router.get('/successpayment', controller.successsPayment);

router.get('/cancelpayment', controller.cancelPayment);

module.exports = router;