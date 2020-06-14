const router = require('express').Router();
const authMiddleware = require('../../middlewares/auth');
const auth = require('./auth')
const user = require('./user')
const word = require('./word');
const image = require('./image');

router.use('/auth', auth);
router.use('/user',authMiddleware);
router.use('/user',user);
router.use('/word', word);
router.use('/image', image);

module.exports = router; 