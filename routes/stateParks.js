var express = require('express');
var knex = require('../knex');
var router = express.Router();

router.get('/stateParks', function(req, res, next) {
  knex('state_parks')
    .then(function(result){
      console.log(result);
      return res.send(result)
    }).catch(function(err){
      console.log(err);
      return res.send(err).status(200);
    })
});

router.post('/stateParks', function(req, res, next) {
  knex('state_parks')
    .insert(req.body, '*')
    .then(function(result){
      console.log(result);
      return res.send(result)
    }).catch(function(err){
      console.log(err);
      return res.send(err).status(200);
    })
});

router.post('/users_stateParks', function(req, res, next) {
  knex('users_state_parks')
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
