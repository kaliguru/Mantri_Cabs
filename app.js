const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoute = require('./api/Routes/user');
const orderRoute = require('./api/Routes/order');
// const uploadRoute = require('./api/Routes/upload');
// const xlstojson = require('./api/Routes/exceltojson');
const driverRoute = require('./api/Routes/driver');



mongoose.connect('mongodb+srv://root:root@cluster0.yrdezl7.mongodb.net/?retryWrites=true&w=majority');

mongoose.connection.on('error',err=>{
    console.log('Not connected with database')
})

mongoose.connection.on('connected',connected=>{
    console.log('Connection to Mantri Cabs Database done')
})
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

app.use('/book',orderRoute);
app.use('/user',userRoute);
app.use('/add_driver',driverRoute);

// app.use('/upload',uploadRoute);
// app.use('/filejson',xlstojson)


app.use((req, res, next) =>{
    console.log('running');
    res.status(400).json({
        msg:"Something went wrong"
    })
    res.status(200).json({
        msg: 'App is runnung'
    })

})









module.exports = app;
