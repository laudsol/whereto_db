var express = require('express');
var knex = require('../knex');
var router = express.Router();

router.get('/awards', function(req, res, next) {
  knex('awards')
    .where(req.body.id, 'user_id')
    .then(function(result){
      console.log(result);
      return res.send(result)
    }).catch(function(err){
      console.log(err);
      return res.send(err).status(200);
    })
});

router.post('/whichaward', function(req, res, next) {
  console.log(req.body);
  knex('awards')
    .where('type',req.body.type)
    .then(function(result){
      console.log(result);
      return res.send(result)
    }).catch(function(err){
      console.log(err);
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
