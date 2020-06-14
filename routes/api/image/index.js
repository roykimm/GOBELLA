const router = require('express').Router();
const controller = require('./controller');

router.get('/random',controller.random);

module.exports = router;