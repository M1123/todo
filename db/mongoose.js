//_______________подключение к БД___________________ 
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/db1', function (err) {
   if (err) throw err;
   console.log('Successfully connected!!!');
});
module.exports = mongoose;


