var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next){
  User.findAll()
    .then(function(allUsers){
      res.render('users', {users: allUsers});
    })
    .catch(next);
})

router.get('/:id', function(req, res, next){
  var foundUser;
  var foundPages;
  var user = User.findOne({
    where: {
      id: req.params.id
    }
  })
  var page = Page.findAll({
    where: {
      authorId: req.params.id
    }
  })
  Promise.all([user, page])
    .then(function(contents){
      foundUser = contents[0];
      foundPages = contents[1];
      res.render('userpages', {user: foundUser, pages: foundPages})
    })
    .catch(next);
})

module.exports = router;
