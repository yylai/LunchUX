var express = require('express')
  , http = require('http')
  , application = require('./routes/application')
  , bodyParser  = require('body-parser');
  
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/foodux');


var app = express();
var server = app.listen(3000);
console.log("Express server listening on port "+ 3000);

app.use(express.static('build'));
app.use(bodyParser.json());
app.use('/api/application', application);

app.get('/', function(req, res){
 res.sendfile(__dirname + '/build/index.html');
});


// /api/finishlater
// /api/finishlater/pin
// /api/application
// /api/application/pin

