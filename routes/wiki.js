var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/add', function(req, res, next) {
  res.render('addpage');
});

router.post('/', function(req, res, next) {
  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });

  page.save()
    .then(function(){
      res.redirect('/');
    })
});

router.get('/', function(req, res, next) {
  res.redirect('/');
});

module.exports = router;
