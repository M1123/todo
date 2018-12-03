var mongoose = require('../db/mongoose');
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
exports.User = mongoose.model('User', userSchema);
