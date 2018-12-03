var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var User = require('../db/User').User;
router.get('/', (req, res, next) => {
  var data;
  data = User.find({}, function(err,users){
    if(err) return next(err);
}); 
console.log(data);
res.render('users', {data:data});
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
