var express = require('express');
var knex = require('../knex');
var router = express.Router();
const bodyParser = require('body-parser');

router.post('/category', function(req, res, next) {
  knex('categories')
    .where('type',req.body.category)
    .then(function(result){
      return res.send(result)
    }).catch(function(err){
      return res.send(err).status(200);
    })
});

router.post('/preventduplicateplace', function(req, res, next) {
  knex('users_categories')
  .where('place',req.body.place)
  .where('user_id',req.body.user_id)
  .then(function(result){
    return res.send(result)
  }).catch(function(err){
    return res.send(err).status(200);
  })
});

router.post('/place', function(req, res, next) {
  knex('users_categories')
    .insert(req.body, '*')
    .then(function(result){
      return res.send(result)
    }).catch(function(err){
      return res.send(err).status(200);
    })
});


router.post('/assessawards', function(req, res, next) {
  knex('users_categories')
    .where('category_id',req.body.category_id)
    .where('user_id',req.body.user_id)
    .then(function(result){
      return res.send(result)
    }).catch(function(err){
      return res.send(err).status(200);
    })
});

module.exports = router;
