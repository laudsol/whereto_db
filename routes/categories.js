var express = require('express');
var knex = require('../knex');
var router = express.Router();

router.get('/category', function(req, res, next) {
  // console.log(req.body);
  knex('categories')
    .where(req.body.category, 'type')
    .then(function(result){
      console.log(result);
      return res.send(result)
    }).catch(function(err){
      console.log(err);
      return res.send(err).status(200);
    })
});

router.post('/place', function(req, res, next) {
  knex('users_categories')
    .insert(req.body, '*')
    .then(function(result){
      console.log(result);
      return res.send(result)
    }).catch(function(err){
      console.log(err);
      return res.send(err).status(200);
    })
});

router.get('/userscategories', function(req, res, next) {
  knex('users_categories')
    .where(req.body.id, 'user_id')
    .where(req.body.category_id, 'category_id')
    .then(function(result){
      console.log(result);
      return res.send(result)
    }).catch(function(err){
      console.log(err);
      return res.send(err).status(200);
    })
});

module.exports = router;
