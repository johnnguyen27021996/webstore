const router = require('express').Router();
const controller = require('../../controllers/index/index');

router.get('/', controller.getHome);

router.get('/about', controller.getAbout);

router.get('/contact', controller.getContact);

module.exports = router;