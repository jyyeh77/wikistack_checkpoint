var express = require('express');
var app = express();
var swig = require('swig');
var morgan = require('morgan');
// var router = require('./routes');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var socketio = require('socket.io');


/* SWIG CONFIG */

// point res.render to the proper directory
app.set('views', __dirname + '/views');
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files
// have it use swig to do so
app.engine('html', swig.renderFile);
// turn of swig's caching
swig.setDefaults({cache: false});

/* LOGGING MIDDLEWARE */

app.use(morgan('dev'));

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

app.get('/', function(req, res, next){
  res.render('index');
})


/* SERVER SETUP */

app.listen(3001, function(req, res, next){
  console.log('Listening on port 3001 :)');
})

