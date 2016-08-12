var router = require('express').Router();

router.use('/wiki', require('./wiki'));
router.use('/users', require('./users'));
router.get('/search', function(req, res, next) {
	res.render('search');
})
router.get('/', function(req, res, next) {
  res.render('index', {});
});

module.exports = router;