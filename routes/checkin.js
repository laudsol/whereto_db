"use strict";

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const knex = require('../knex');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const FB = require('fb');

router.get('/checkin', (req, res, next)=>{
  req.body.id = req.session.userID;
  // can use req.cookie.token
  console.log(req.session.userID);
  knex('users')
    // .insert(req.body)
    .where(req.body.id = 'fb_id')
    .returning('fb_id')
    .then(function(id){
      getSkillCards(req.session.userID,id[0])
      .then(function(result) {
        console.log(result[0]);
        return res.send(result[0]);
      })
    })
    .catch((err)=>{
      console.log(err);
      return res.status(400).send(err);
    });
});


module.exports = router;
