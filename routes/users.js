var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
var User = require('../db/User').User;
router.get('/', (req, res, next) => {
  User.find({}, function(err,users){
    if(err) return next(err);
    res.json(users);
}); 
});
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function(err,user){
    if(err) return next(err);
    if(!user){
      next(err)
    }
    res.json(user);
}); 
});


module.exports = router;
