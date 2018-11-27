var express = require('express');
//_______________подключение к БД___________________
var mongoose = require('mongoose');
 
mongoose.connect('mongodb://localhost/db1', function (err) {
   if (err) throw err;
   console.log('Successfully connected!!!');
});

const Cat = mongoose.model('Cat', { name: String });
// const kitty = new Cat({ name: 'Zildjian' });
//kitty.save().then(() => console.log('meow'));

var userSchema = mongoose.Schema({
  name: String,
  role:Boolean,
  created: Date
});
var User = mongoose.model('User', userSchema);

var taskSchema = mongoose.Schema({
  text: String,
  priority: Number,
  created: { 
      type: Date,
      default: Date.now
  }
});
// var SomeText =document.getElementsByName('tasktext');
var User = mongoose.model('User', userSchema);
var Task = mongoose.model('Task', taskSchema);
var newTask = new Task({ 
  text: 'SomeText',
  priority: '3'
});

newTask.save(function(err) {
  if (err) throw err;
  console.log('Task successfully saved.');
  console.log(newTask.text);
});



//_______________________router_________________
var router = express.Router();

/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/
router.get('/', (request, response, next) => {
  response.render('home', {
      name: 'John!'
  })
})
Task.find().sort('-created')
.limit(5)
.exec(function(err, books) {
  if (err) throw err;
   
  console.log(books);
});
module.exports = router;