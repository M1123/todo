var mongoose = require('../db/mongoose');
var taskSchema = mongoose.Schema({
    text: String,
    priority: Number,
    created: { 
        type: Date,
        default: Date.now
    }
  });
  
exports.Task = mongoose.model('Task', taskSchema);
//   var Task = mongoose.model('Task', taskSchema);
//   Task.find().sort('-created')
//   .exec(function(err, tasks) {
//     if (err) throw err;
//     console.log(tasks);
//   });