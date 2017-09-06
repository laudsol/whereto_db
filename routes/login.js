"use strict";

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const knex = require('../knex');
const bodyParser = require('body-parser');

router.post('/login', function(req,res,next){
  knex('users')
  .insert(req.body, '*')
  .then((result)=>{
    return res.send(result.id);
  })
  .catch((err)=>{
    return res.status(400).send(err);
  });

});

router.get('/login/:id', (req, res, next)=>{
  knex('users')
  .where('fb_id', req.params.id)
  .then((data) => {
    req.session.userID=data[0]['id'];
    return res.send(data[0]);
  })
  .catch((err)=>{
    res.status(400).send(err);
  });
});
module.exports = router;
