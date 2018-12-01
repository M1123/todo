var express = require('express');
var User = require('../db/User').User;
var HttpError = require('http-errors');


//_______________________router_________________
var router = express.Router();

//  GET home page. 
router.get('/', (req, res, next) => {
  res.render('home', {username: req.session.user})
});
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.get('/admPanel', function(req, res, next) {
  res.render('admPanel');
});


// router.post('/login', function(req, res, next) {
//   var username = req.body.username;
//   var password = req.body.password;

//   User.authorize(username,password, function(err, user){
//     async.waterfall([
//       function(callback){
//         User.findOne({username: username}, callback);
//       },
//       function(user,callback){
//         if (user){
//           if(user.checkPassword(password)){
//             callback(null,user);
//           }else {
//             next(new HttpError(403,"Pass "))
//           }
//         }else{
//           var user = new User({username:username, password: password});
//           user.save(function(err){
//             if(err)return callback(err);
//             callback(null, user);
//           });
//         }
//       }
//     ], function(err,user){
//       if(err) return next(err);
//       req.session.user = user._id;
//       req.session.authorize = true;
//       res.end();
//     });
//   })
// });
app.get('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/users/' + user.username);
    });
  })(req, res, next);
});


module.exports = router;