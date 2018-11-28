var mongoose = require('../db/mongoose');
var async = require('async');

async.series([
    open,
    dropDatabase,
    requireModels,
    createUsers
], function(err){
    console.log(arguments);
    mongoose.disconnect();
});
function open(callback){
    mongoose.connection.on('open', callback);
}
function dropDatabase(callback){
    var db = mongoose.connection.db;
    db.dropDatabase(callback); 
}
function requireModels(callback){
    require('../db/User');

    async.each(Object.keys(mongoose.models), function(modelName, callback){
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}
function createUsers(callback){
    var users = [
        {username:'Вася', password:'qwerty'},
        {username:'Петя', password:'123'},
        {username:'admin', password:'asd'}
    ];
    async.each(users, function(userData, callback){
        var user = new mongoose.models.User(userData);
        user.save(callback);
    }, callback);
}

// mongoose.connection.on('open',function(){
//   var db = mongoose.connection.db;
//   db.dropDatabase(function(err){
//     if (err) throw err;
    
//     async.parallel([
//       function(callback){
//         var vasya = new User({username:'Вася', password:'qwerty'});
//         callback(err, vasya);
//       },
//       function(callback){
//         var petya = new User({username:'Петя', password:'123'});
//         callback(err, petya);
//       },
//       function(callback){
//         var admin = new User({username:'admin', password:'asd'});
//         callback(err, admin);
//       }
//     ], function(err, results){
//       console.log(arguments);
//       mongoose.disconnect();
//     })
//     //var vasya = new User({username:'Вася', password:'qwerty'});

    
//   });

// })
