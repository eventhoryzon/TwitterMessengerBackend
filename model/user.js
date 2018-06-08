'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var config = require('../config/config');

//User Model Schema 
var CompanySchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
     lastname: {
        type: String,
        required: true
    },
      companyname: {
          type: String,
          required: true,
          unique: true
    },
     companywebsite: {
         type: String,
         required: true,
         unique: true
     },
     email: {
        type: String,
        unique: true,
        lowercase:true,
        required: true
    },
    mobilenumber: {
        type: String,
        required: true,
        unique:true
    },
    countryCode: Number,
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['management','admin'],
        default: 'management'
    },
    lastLogin: {
        type: Date
        }
    },{
        timestamps : true
});



//Midlleware is executed before save - hash the user's password using SALT
CompanySchema.pre('save',function(next){
    var self = this;
    var SALT_FACTOR = 10;

    //only going to hash the password if it has been modified (or is new)
    if(this.isModified('password')||this.isNew){

        //Using bcrypt and generating a salt 
        bcrypt.genSalt(SALT_FACTOR,function(err,salt){
            if(err){
                return next(err);
            }
            //hash the password using the new salt
            bcrypt.hash(self.password, salt, function(err,hash){
                if(err){
                    return next(err);
                }
                //override the password 
                self.password = hash;
                next();
            });
        });
    }
});
        
//Test and Compare the passwords 
CompanySchema.methods.comparePassword = function(passw , cb){
    bcrypt.compare(passw, this.password, function(err, isMatch){
        if(err){
            return cb(err);
        }
        cb(null, isMatch);
    });
}


module.exports = mongoose.model('User', CompanySchema);