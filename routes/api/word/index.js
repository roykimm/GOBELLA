const router = require('express').Router();
const controller = require('./controller');
const { check } = require('express-validator');

router.get('/' , controller.getWords);

router.post('/add', 
    [
        check('word')
            .not()
            .isEmpty(),
        check('wordname')
            .not()
            .isEmpty()
    ],
    controller.addWord
);

router.delete('/:pid', controller.deleteWord);

module.exports = router;