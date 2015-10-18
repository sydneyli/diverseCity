var express = require('express'),
    logger = require('morgan'),
    passport = require('passport'),
    session = require('express-session'),
    LocalStrategy = require('passport-local');

var config = require('./config.js'),
    funct = require('./functions.js');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
