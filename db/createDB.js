var mongoose = require('../db/mongoose');
var async = require('async');

async.series([
    open,
    dropDatabase,
    requireModels,
    createUsers
], function(err){
    console.log('done');
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
