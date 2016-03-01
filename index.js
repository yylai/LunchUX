var express = require('express')
  , http = require('http')
  , finishlater = require('./routes/finishlater')
  , application = require('./routes/application')

var app = express();
var server = app.listen(3000);
console.log("Express server listening on port "+ 3000);

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/foodux');


//app.get('/',index);