// Load in our express module to run the webserver
const express = require("express");
const app = express();
// Get our Routes
const accountRoutes = require('./routes/accounts');
const productRoutes = require('./routes/products');
//load in the bodyParser middleware
const bodyParser = require("body-parser");
// Load in mongo.js which has our Database class to handle different functions
const mongoDatabase = require('./mongo/accounts_mongo');
// Create a new instance of the class and assign the DB pixalynx
const Data = new mongoDatabase("pixalynx");
// Middleware stuff
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

 //use our routes
app.use('/api/accounts',accountRoutes);
app.use('/api/products',productRoutes);
//////////////// 
// This is our server class which will handle starting up,routes  etc.
class appServer{
    constructor(PORT){
        this.port = PORT;
        
    }

    startServer(){
        app.listen(this.port);
        
    }

    handleRoutes(){
        
    }
}

module.exports = appServer;