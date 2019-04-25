const MongoClient = require('mongodb').MongoClient;
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });
const mongoose = require('mongoose');
const User = require('../models/loginModel.js');

exports.checkLogin = function(request, response){
    mongoose.connect("mongodb://localhost:27017/usersDB", { useNewUrlParser: true }); 
    
    const user = new User({
        login: request.body.login,
        password: request.body.password
    });

    

    User.find({login: user.login, password: user.password}, function(error, result){
        if(error) console.log(error);
        if(result.length == 0){
            console.log('No match');
            console.log(result);  
        }else{
            response.send({'isLogin' : true});  
            console.log('Match');  
            console.log(result);         
        }
            
    });
     
    
}