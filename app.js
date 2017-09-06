var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cookieSession = require('express-session');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;
// Routes -----------------------------
var login = require('./routes/login');
var users = require('./routes/users');
var categories = require('./routes/categories');
var awards = require('./routes/awards');
// Routes -----------------------------

app.use(cookieSession({
  // name: 'session',
  resave: false,
  saveUninitialized: true,
  // keys: [process.env.SECRET]
  secret: 'secret string'
}));

app.use('/',function(req,res,next){
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','*');
  next();
});

app.use(cookieParser());


app.use((req, res, next)=>{
    next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(login);
app.use(users);
app.use(categories);
app.use(awards);

// this route reads if they have cookies when the splash page loads. this info is used to changed to login button text from login to continue ----------------------------------
app.get('/continue', function(req,res,next){;
  var cookiearray = (Object.keys(req.session));
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
