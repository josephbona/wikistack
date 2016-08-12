var router = require('express').Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;


router.get('/', function(req, res, next){
  Page.findAll()
  .then(function(pages){
  res.render('index', { pages: pages}) 
  }).catch(next);
});

router.post('/', function(req, res, next){
  var page = Page.build({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    email: req.body.email
  });
  page.save().then(function(results){
    res.redirect(results.route);
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