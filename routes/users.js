var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var bodyParser = require('body-parser');

var User = require('../db/User').User;
router.get('/', (req, res, next) => {
  User.find({}, function(err,users){
    if(err) return next(err);
    res.json(users);
}); 
// res.render('users', {title:'Welcome,', data:data});
});

router.get('/:id', function(req, res, next) {
  try{
    var id = new ObjectID(req.params.id);
  } catch (e) {
    next(404);
    return ;
  }
  User.findById(id, function(err,user){
    if(err) return next(err);
    if(!user){next(err)}
    res.render('user', {username:req.session.username});
}); 
});

module.exports = router;
