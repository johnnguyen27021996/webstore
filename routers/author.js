const router = require('express').Router();
const controller = require('../controllers/author');

router.get('/', controller.getLogin);

router.post('/login', controller.postLogin);

router.get('/logout', controller.getLogout)

module.exports = router;