var express = require('express');
// var crypto = require('crypto');
var User = require('../db/User').User;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.findOne({
        _id: id
    }, '-password -salt', function(err, user) {
        done(err, user);
    });
});
  

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, function(username, password,done){
  User.findOne({ username : username},function(err,user){
    return err 
      ? done(err)
      : user
        ? password === user.password
          ? done(null, user) 
          : done(null, false, { message: 'Incorrect password.' })
        : done(null, false, { message: 'Incorrect username.' });
  });
}));

//_______________________router_________________
var router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index')
});
router.get('/test', (req, res, next) => {
  res.json(req.session);
});
router.get('/user', function(req, res, next) {
  if (req.session.passport.user === undefined){
    res.redirect('/');
  }else{
    res.render('user', {id:req.session.passport.user});
    console.log('u r loged in')
  }
});

router.get('/private', function (req, res, next){
  if(req.isAuthenticated()){
    res.redirect('/user');
    console.log('loged in');
  }else{res.redirect('/'); 
  console.log('not loged in');} 
});

router.post('/login', 
    passport.authenticate('local',{
      successRedirect:'/user',
      failureRedirect:'/',
      session: true
    }));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.post('/register', function(req, res, next) {
  var user = new User({ username: req.body.regusername, password: req.body.regpassword});
    // if (user.password){
    //       user.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    //       user.password = crypto.pbkdf2Sync(user.password, user.salt, 10000, 64).toString('base64');
    //     };
  user.save(function(err) {
    console.log('register - ', req.body.regusername)
    return err
      ? next(err)
      : req.logIn(user, function(err) {
        return err
          ? next(err)
          : res.redirect('/private');
      });
  });
});

module.exports = router;