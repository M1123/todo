var express = require('express');
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

module.exports = router;

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