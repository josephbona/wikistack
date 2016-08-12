var router = require('express').Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;


router.get('/', function(req, res, next) {
  Page.findAll()
    .then(function(pages) {
      res.render('index', {
        pages: pages
      })
    }).catch(next);
});

router.post('/', function(req, res, next) {
  User.findOrCreate({
    where: {
      name: req.body.name,
      email: req.body.email,
    }
  }).then(function(values) {
    var user = values[0];
    var page = Page.build({
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags.split(',')
    });

    return page.save().then(function(page) {
      return page.setAuthor(user);
    });
  })
    .then(function(page) {
      res.redirect(page.route);
    }).catch(next);
});

router.get('/add', function(req, res, next) {
  res.render('addpage', {});
});

router.get('/search', function(req, res, next) {
  var query = req.body.query.split(' ');
  Page.findByTag(query).then(function(results) {
    res.render('index', {
      pages: results
    });
  }).catch(next);
});

router.get('/:urlTitle', function(req, res, next) {
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    },
    include: [{
      model: User,
      as: 'author'
    }]
  }).then(function(page) {
    if (page === null) {
      res.status(404).send();
    } else {
      res.render('wikipage', {
        page: page
      });
    }
  }).catch(next);
});

module.exports = router;