var router = require('express').Router();
var Promise = require('bluebird');
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/:id', function(req, res, next){
	var userLookup = User.findOne({where: {id: req.params.id}});
	var pageLookup = Page.findAll({where: {authorId: req.params.id}});
	Promise.all([userLookup, pageLookup]).then(function(results){
		res.render('userpage', {user: results[0], pages: results[1]});
	}).catch(next);
});
router.get('/', function(req, res, next){
	User.findAll({}).then(function(users){
		res.render('users', {users:users});
	}).catch(next);
});

module.exports = router;