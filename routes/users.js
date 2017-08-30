var express = require('express');
var knex = require('../knex');
var router = express.Router();
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const FB = require('fb');

/* GET users listing. */
router.get('/users', function(req, res, next) {
  knex('users')
    .then(function(result){
      console.log(result);
      return res.send(result)
    }).catch(function(err){
      console.log(err);
      return res.send(err).status(200);
    })
});

module.exports = router;
