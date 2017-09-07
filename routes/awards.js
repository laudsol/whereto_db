var express = require('express');
var knex = require('../knex');
var router = express.Router();

router.post('/allawards', function(req, res, next) {
  knex('users_awards')
    .where('user_id',req.body.user_id)
    .join('awards','users_awards.award_id','awards.id')
    .then(function(result){
      return res.send(result)
    }).catch(function(err){
      return res.send(err).status(200);
    })
});

router.post('/preventduplicateaward', function(req, res, next) {
  knex('users_awards')
    .where('type',req.body.type)
    .where('user_id',req.body.user_id)
    .then(function(result){
      return res.send(result)
    }).catch(function(err){
      return res.send(err).status(200);
    })
});

router.post('/whichaward', function(req, res, next) {
  knex('awards')
    .where('type',req.body.type)
    .then(function(result){
      return res.send(result)
    }).catch(function(err){
      return res.send(err).status(200);
    })
});

router.post('/postaward', function(req, res, next) {
  knex('users_awards')
    .insert(req.body, '*')
    .then(function(result){
      return res.send(result)
    }).catch(function(err){
      return res.send(err).status(200);
    })
});


module.exports = router;
