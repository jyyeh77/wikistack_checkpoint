var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/add', function(req, res, next) {
  res.render('addpage');
});

router.get('/', function(req, res, next) {
  var pages;
  Page.findAll({
  })
  .then(function(foundPages){
    res.render('index', {pages: foundPages});
  })
  .catch(next);
});

router.post('/', function(req, res, next) {

  User.findOrCreate({
    where: {
      name: req.body.authorName,
      email: req.body.authorEmail
    }
  })
  .spread(function(user, createdBoolean){
    var page = Page.build({
      title: req.body.title,
      content: req.body.content
    });

    return page.save().then(function(page){
      return page.setAuthor(user);
    });
  })
  .then(function(page){
    res.redirect(page.route);
  })
  .catch(next);
});

router.get('/:urlTitle', function(req, res, next){
  var page;
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then(function(foundPage){
    var user;
    foundPage.getAuthor({
      where: {
        id: foundPage.authorId
      }
    })
    .then(function(foundAuthor){
      user = foundAuthor;
      res.render('wikipage', {foundPage: foundPage, foundAuthor: foundAuthor});
    })
  })
  .catch(next);
})

module.exports = router;
