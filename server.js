var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());
//GET
app.get('/todos', function(req, res) {
  res.json(todos);
});

app.get('/todos/:id', function(req, res) {
  var todoId = parseInt(req.params.id);
  var matchedTodo = _.findWhere(todos, {
    id: todoId
  });
  if (matchedTodo) {
    res.json(matchedTodo);
  } else {
    res.status(404).send();
  }
});

app.get('/', function(req, res) {
  res.send('Todo API Root');
});

app.listen(PORT, function() {
  console.log('Express listening on port ' + PORT);
});
db.sequelize.sync().then(function(){

});
app.post('/todos', function(req, res) {
  var body = _.pick(req.body, 'description', 'completed');
  db.todo.create(body).then(function(todo){
    res.json(todo.toJSON());
  },function(e){
    res.status(400).json(e);
  });
});