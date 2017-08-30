var express = require('express');
var knex = require('../knex');
var router = express.Router();

/* GET users listing. */
router.get('/users', function(req, res, next) {
  console.log('session',req.session.userID);
  knex('users')
    .then(function(result){
      console.log(result);
      return res.send(result)
    }).catch(function(err){
      console.log(err);
      return res.send(err).status(200);
    })
});

module.exports = router;
