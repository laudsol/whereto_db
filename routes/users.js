var express = require('express');
var knex = require('../knex');
var router = express.Router();

/* GET users listing. */
router.get('/users', function(req, res, next) {
  knex('users')
    .then(function(result){
      return res.send(result)
    }).catch(function(err){
      return res.send(err).status(200);
    })
});

module.exports = router;
