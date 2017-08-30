if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var login = require('./routes/login');
var users = require('./routes/users');
var checkin = require('./routes/checkin');
var app = express();
var FB = require('fb');
var port = process.env.PORT || 3000;

app.use('/',function(req,res,next){
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','*');
  next();
});

app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(res.cookies);
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
      if (error) {
        res.clearCookie('token');
        return next(error);
      }
      req.user = decoded;
      next();
    });
  } else {
    next();
  }
});

// app.use(cookieSession({
//   name: 'session',
//   keys: [process.env.SECRET]
// }));
//
// app.use(function (req,res,next) {
//   console.log('session',req.session);
//   if (req.session.userId) {
//     knex('users')
//     .where({id:req.session.userId})
//     .first()
//     .then(function (result) {
//       req.user = result;
//       next();
//     });
//   } else {
//     next();
//   }
// });

app.use((req, res, next)=>{
    next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));


app.use('/users', users);
app.use(login);
app.use(users);
app.use(checkin);

// this route reads if they have cookies when the splash page loads. this info is used to changed to login button text from login to continue ----------------------------------
app.get('/continue', function(req,res,next){;
  var cookiearray = (Object.keys(req.cookies));
  if (cookiearray.length !== 0){

    return res.send("yes cookie")
  }
  else if (cookiearray.length === 0){
    return res.send("no cookie")
  }
  else{
    next();
  }
})


app.listen(port , function(){
  console.log("Listening on port",port);
});

module.exports = app;
