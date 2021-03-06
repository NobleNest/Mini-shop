var express = require('express'),
  app = express(),
  port = 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/Model'), //created model loading here
  bodyParser = require('body-parser');
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/cart'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/Route'); //importing route
routes(app); //register the route


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);

var cors = require('cors')
app.use(cors())