var express =  require("express");
var app = express();
var port = process.env.PORT || 8080;
var morgan = require("morgan");
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var cors = require('cors');
var multer = require('multer');
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
config = require('./config/config'); 
auth = require('./config/auth');
passport = require('passport');

require('./model/db');
require('./model/user');

mongoose.connection.on('open' ,  function(err){
    if(err) {
        console.log("Not Connected to the Database" , + err);
    }else{
        console.log("Connected to the Mongo Database");
    }

    app.use(express.static('ProfilePicture'));
    app.use(morgan('dev'));
    app.use(cors());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(routes);
    app.use(multer);
    app.use(passport.initialize());

     //This ensures we can execute the app during simulation
//Drop if going to production
app.use(function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        res.end();
    } else {
        next();
    }
});


app.get('/', function(req, res) {  
    res.send('Hello! The API ladning is at http://localhost:' + port + '/app_api');
});

app.listen(port, function(){
    console.log("Running server on port -> " + port);
});

// Export app
exports = module.exports = app;
})

 routes = require('./routes/routes');