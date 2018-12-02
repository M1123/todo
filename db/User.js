var mongoose = require('../db/mongoose');
var crypto = require('crypto');

var userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  salt:{
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  },
  rr: {
    type: Boolean,
    default: false
  },
});
userSchema.pre('save', function(next) {
    if (this.regpassword){
          this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
          this.password = crypto.pbkdf2Sync(regpassword, this.salt, 10000, 64).toString('base64');
  };
  next();
});
exports.User = mongoose.model('User', userSchema);
