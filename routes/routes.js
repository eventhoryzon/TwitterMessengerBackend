var express = require('express');
var router = express.Router();


var loginactions = require('../methods/loginactions');

// var user = require('../model/user');

//User related routes
router.post('/loginAuthenticate', loginactions.loginAuthenticate);
router.post('/addNewUser', loginactions.addNewUser);
router.get('/getinfo', loginactions.getinfo);
router.get('/getallusers' , loginactions.getallusers);
router.delete('/deleteuser/:id',loginactions.deleteuser);

module.exports = router;