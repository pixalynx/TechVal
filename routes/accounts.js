/*This is the file for the accounts route which will then be served as its own microservice when deploed as an application
    This file will include anything to get data and place data into user accounts.
    It will also include a token management system
*/

const express = require('express');
const router = express.Router();
// Load in accounts_mongo.js which has our Database class to handle different account functions
const mongoDatabase = require('../mongo/accounts_mongo');
// Create a new instance of the class and assign the DB pixalynx
const Data = new mongoDatabase("pixalynx");

router.get('/test', (req,res) => {
    res.send('hello world from accounts.js');
    
})

router.get('/getAllAccounts',(req,res) => {
    let dataobj = {};
    Data.getAllAccounts().then(result =>{
        dataobj = result;
        console.log(`Returned ${dataobj.length}`);
        res.send(dataobj);
    });            
}) 

router.get('/getAccountByName/:accountname', (req,res) =>{
    let acc = req.params.accountname;
    Data.getAccountByName(acc).then(result =>{
        if(result === "failed"){
            res.status(404).send("failed to find any accounts matching that name");
            //res.send("Failed to find any accounts matching that name");
        }else{
        res.send(result);
        }
    })
    //res.send(`you entered : ${acc}`);
})

router.post('/createAccount', (req,res) => {
    let myobj = req.body;
    let username = myobj.username;
    // check if the account already exists
    Data.getAccountByName(username).then(result1 =>{
        // if it doesnt then create the account
        if(result1 === "failed"){
            Data.createAccount(myobj).then(result => {                
                if(result === true){
                    res.send("Account Created Successfully")                    
                }else{
                    res.send("Failed to create Account");
                }
            })    
        }else {
            // if the account exists then advise them it already does
            res.send("Account already exists fam");
        }
    })
           
})

router.post('/login', (req,res) => {
    let myobj = req.body;
    Data.login(myobj).then(result => {
        if(result === true){
            res.send('logged in');
        }else{
            res.send('Failed to log in');
        }
    })
})



module.exports = router;