const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const Driver = require('../modules/driver');


router.post('/new',(req,res,next)=>{
        console.log("hitted")
    const driver = new Driver({
        _id : mongoose.Schema.Types.ObjectId,
        driverName: req.body.driverName,
        vehicalNumber: req.body.vehicalNumber,
        dlNumber:req.body.dlNumber,
        carNumber:req.body.carNumber,
        aadharNumber:req.body.aadharNumber,
        panNumber:req.body.panNumber,
       })
       driver.save()
       .then(result=>{
        console.log(result);
        res.status(200).json({
            newDriver:result
        })
       })
       .catch(err=>{
        res.status(500).json({
            error:err
        })
       })
})

module.exports = router;

