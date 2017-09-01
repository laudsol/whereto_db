var express = require('express');
var knex = require('../knex');
var router = express.Router();

router.get('/cities', function(req, res, next) {
  knex('cities')
    .then(function(result){
      console.log(result);
      return res.send(result)
    }).catch(function(err){
      console.log(err);
      return res.send(err).status(200);
    })
});

router.post('/cities', function(req, res, next) {
  knex('cities')
    .insert(req.body, '*')
    .then(function(result){
      console.log(result);
      return res.send(result)
    }).catch(function(err){
      console.log(err);
      return res.send(err).status(200);
    })
});

router.post('/users_cities', function(req, res, next) {
  knex('users_cities')
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
