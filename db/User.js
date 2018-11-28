var mongoose = require('../db/mongoose');
var crypto = require('crypto');

var userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  hashedPassword:{
    type: String,
    required: true
  },
  salt:{
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});
userSchema.methods.encryptPassword = function(password){
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};
userSchema.virtual('password')
  .set(function(password){
    this._plainPassword = password;
    this.salt = Math.random() + '';
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function(){ return this._plainPassword;});

userSchema.methods.checkPassword = function(password){
  return this.encryptPassword(password) === this.hashedPassword;
};
exports.User = mongoose.model('User', userSchema);
