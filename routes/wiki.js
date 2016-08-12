var router = require('express').Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next){
  res.redirect('/');
});

router.post('/', function(req, res, next){
  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });
  page.save().then(function(results){
    res.json(results)
  }).catch(next);
});
router.get('/add', function(req, res, next){
  res.render('addpage', {});
})
router.get('/:urlTitle', function(req, res, next){
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  }).then(function(results){
    res.render('wikipage', {pageData: results.dataValues});
  }).catch(next);
});

module.exports = router;