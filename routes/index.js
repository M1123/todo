var express = require('express');
var User = require('../db/User').User;
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;


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
  res.render('index', {username: req.session.user})
});
router.get('/user', function(req, res, next) {
  if (req.session.passport.user === undefined){
    res.redirect('/login');
  }else{
    res.render('user', {title:'Welcome,', user: req.user})
  }
  res.render('user', {title:'Welcome,', user: req.user});
});

router.get('/private', function (req, res, next){
  req.isAuthenticated()
    ? next()
    : res.redirect('/');
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local',
      function(err, user, info) {
        console.log('login ', req.username);
        return err
        ? next(err)
        : user
          ? req.logIn(user, function(err) {
              return err
                ? next(err)
                : res.redirect('/user');
            })
          : res.redirect('/');
          
    }
  )(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.post('/register', function(req, res, next) {
  var user = new User({ username: req.body.regusername, password: req.body.regpassword});
  user.save(function(err) {
    console.log('register ', req.regusername)
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