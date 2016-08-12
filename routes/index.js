var router = require('express').Router();

router.use('/wiki', require('./wiki'));
router.use('/users', require('./users'));
router.get('/', function(req, res, next){
	res.render('index', {});
});

module.exports = router;