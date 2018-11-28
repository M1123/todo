var express = require('express');


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
});






module.exports = router;