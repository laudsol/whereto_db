var express = require('express');
var knex = require('../knex');
var router = express.Router();

router.get('/nationalParks', function(req, res, next) {
  knex('national_parks')
    .then(function(result){
      console.log(result);
      return res.send(result)
    }).catch(function(err){
      console.log(err);
      return res.send(err).status(200);
    })
});

router.post('/nationalParks', function(req, res, next) {
  knex('national_parks')
    .insert(req.body, '*')
    .then(function(result){
      console.log(result);
      return res.send(result)
    }).catch(function(err){
      console.log(err);
      return res.send(err).status(200);
    })
});

router.post('/users_nationalParks', function(req, res, next) {
  knex('users_national_parks')
    .insert(req.body, '*')
    .then(function(result){
      console.log(result);
      return res.send(result)
    }).catch(function(err){
      console.log(err);
      return res.send(err).status(200);
    })
});


module.exports = router;
