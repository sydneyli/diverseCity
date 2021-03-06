var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('rendering home page');
  res.render('index', {});
});

router.get('/register', function(req, res) {
  console.log('rendering register');
  res.render('register', { });
});

router.post('/register', function(req, res) {
  console.log('posting', req);
  Account.register(
      new Account({ username : req.body.username }),
      req.body.password,
      function(err, account) {
        if (err) {
          return res.render('register', {account: account});
        }
        passport.authenticate('local')(req, res, function() {
          res.redirect('/');
        });
      });
});

router.get('/login', function(req, res) {
    res.render('login' /*, { user : req.user }*/);
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
