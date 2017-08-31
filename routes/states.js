var express = require('express');
var knex = require('../knex');
var router = express.Router();

router.get('/states', function(req, res, next) {
  knex('states')
    .then(function(result){
      console.log(result);
      return res.send(result)
    }).catch(function(err){
      console.log(err);
      return res.send(err).status(200);
    })
});

router.post('/states', function(req, res, next) {
  knex('states')
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
