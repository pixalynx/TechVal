/*This is the file for the products route which will then be served as its own microservice when deploed as an application
    This file will include anything to get data and place data into user products.
    It will also include a token management system
*/

const express = require('express');
const router = express.Router();
// Load in mongo.js which has our Database class to handle different functions
const mongoDatabase = require('../mongo/products_mongo');
// Create a new instance of the class and assign the DB pixalynx
const Data = new mongoDatabase("pixalynx");

router.get('/test', (req,res) => {
    res.send('hello world from products');
})

router.get('/getAllProducts', (req,res) => {
    Data.getAllProducts().then(result => {
        let dataobj = result;
        res.send(dataobj);
    })
})

router.get('/getProductbySerial/:serial', (req,res) => {
    let input = req.params.serial;
    Data.getProductbySerial(input).then(result => {
        if(result === 'failed'){
            res.send('No such product exists');
        }else if(result === 'error'){
            res.send('an error took place please try again');
        }else{
            //send the actual result that we managed to retrieve the product by serial
        res.send(result);
        }
    })
})

router.post('/createProduct', (req,res) => {
    let myobj = req.body;
    Data.createProduct(myobj).then(result => {
        if(result === true){
            res.send(`We have added ${myobj.productName} to the database`);
        }else if(result === false){
            res.send('failed to add to the database');
        }
    })
})

router.get('/findProductbyType/:Type', (req,res) => {
    let input = req.params.Type;
    Data.findProductByType(input).then(result => {
        if(result === false){
            res.send('Cannot find the product type');
        }else{
            res.send(result);
        }
    })
})



module.exports = router;

