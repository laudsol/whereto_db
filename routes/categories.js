var express = require('express');
var knex = require('../knex');
var router = express.Router();

router.get('/categories', function(req, res, next) {
  knex('users_categories')
    .then(function(result){
      console.log(result);
      return res.send(result)
    }).catch(function(err){
      console.log(err);
      return res.send(err).status(200);
    })
});

// router.get('/categories/:id', function(req, res, next) {
//   knex('users_categories')
//     .then(function(result){
//       console.log(result);
//       return res.send(result)
//     }).catch(function(err){
//       console.log(err);
//       return res.send(err).status(200);
//     })
// });

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


module.exports = router;
