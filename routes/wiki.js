var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/add', function(req, res, next) {
  res.render('addpage');
});

router.get('/', function(req, res, next) {
  console.log('Returning to home page!');
  var pages;
  Page.findAll({
  })
  .then(function(foundPages){
    res.render('index', {pages: foundPages});
  })
  .catch(next);
});

router.post('/', function(req, res, next) {
  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });

  page.save()
    .then(function(){
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
    res.render('wikipage', { page: foundPage });
  })
  .catch(next);
})

module.exports = router;
