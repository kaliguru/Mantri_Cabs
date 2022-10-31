const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../modules/orderModel');
const checkAuth = require('../middleware/check-auth');
const request = require('request');
const fetch = require('node-fetch');
// const idAutoIncrement = require("id-auto-increment");





router.get('/all',(req, res, next)=>{
    Order.find()
    .then(result=>{
        res.status(200).json(
        result
        );
        // res.status(200).request(options, function (error, response) {
        //     if (error) throw new Error(error);
        //     console.log(response.body);
        //   });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})


router.get('/:id',(req, res, next)=>{
    console.log(req.params.id);
Order.findById(req.params.id)
.then(result=>{
    res.status(200).json({
        order:result
    });
})
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})
//Counter Tabel

const counterScheme = {
    bookingid:
    {
        type:String
    },
    seq:
    {
        type:Number
    }
}

const counterModel = mongoose.model("counter",counterScheme);





router.post('/citytoairport',(req, res, next)=>{

           if(req.body.customerName == null || req.body.mobile == null || req.body.email == null|| req.body.pickupAddress == null|| req.body.dropoffAddress == null || req.body.pickupDate == null || req.body.pickupTime == null)
           {
            return res.status(406).json({
                statusCode: res.statusCode,
                messege: "Please fill Complete Details"
            })

           }else 
           {
            const order = new Order({
                _id:new mongoose.Types.ObjectId,
                bookingId: req.body.bookingId,
                customerName: req.body.customerName,
                mobile: req.body.mobile,
                email: req.body.email,
                pickupAddress: req.body.pickupAddress,
                dropoffAddress: req.body.dropoffAddress,
                pickupDate: req.body.pickupDate,
                pickupTime: req.body.pickupTime,
                carType:  req.body.carType,
                amount:req.body.amount
               })
            
               
               order.save()
               .then(result=>{
                
                
                var options = {
                    'method': 'POST',
                    'url': 'https://2factor.in/API/R1/',
                    'headers': {
                    },
                    form: {
                      'module': 'TRANS_SMS',
                      'apikey': '9f9e7def-e06b-11eb-8089-0200cd936042',
                      'to': req.body.mobile,
                      'from': 'VTRVLZ',
                      'msg': `Dear ${req.body.customerName},Thank you for choosing Venus Travelz, Your Booking ID {#var#} is confirmed, Driver will contact you before a hour of your trip. Dated ${req.body.pickupDate}, From ${req.body.pickupAddress} to ${req.body.dropoffAddress}.For more query contact support at +91 9538434747.`
                    }
                  }
                  request(options, function (error, response) {
                    if (error) throw new Error(error);
                    console.log(response.body);
                  });
                  var watiMobile = req.body.mobile;
                  var customername = req.body.customerName;
                  const url = `https://app-server.wati.io/api/v1/sendTemplateMessage?whatsappNumber=${watiMobile}`;
                //   const options1 = {
                //     method: 'POST',
                //     headers: {
                //       'content-type': 'text/json',
                //       Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4ODk5M2YxOC1hMDk3LTRkNTUtOTAxOS1lMWFhNzk4MGYyZDUiLCJ1bmlxdWVfbmFtZSI6Im5hdmkuZG5zYS4xNDNAZ21haWwuY29tIiwibmFtZWlkIjoibmF2aS5kbnNhLjE0M0BnbWFpbC5jb20iLCJlbWFpbCI6Im5hdmkuZG5zYS4xNDNAZ21haWwuY29tIiwiYXV0aF90aW1lIjoiMTAvMTIvMjAyMiAxMzo0MDo0OCIsImRiX25hbWUiOiJ3YXRpX2FwcCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlRSSUFMIiwiZXhwIjoxNjY2MjI0MDAwLCJpc3MiOiJDbGFyZV9BSSIsImF1ZCI6IkNsYXJlX0FJIn0.6hAQ7IYavSfbAIpRAOBN0B2TlNnneeVOd02VoWKGciY'
                //     },
                //     body: JSON.stringify({
                //         parameters: [
                //             {
                //                 name: 'name', value: req.body.customerName
                //             },
                //             {
                //                 name:'defaultTeamName',value:req.body.email
                //             }
                //         ],
                //         broadcast_name: 'hgeudfhueihf',
                //         template_name: 'welcome_to_new_customer_default_template'
                //       })
                //     };
                    
                //     fetch(url, options1)
                //       .then(res => res.json())
                //       .then(json => console.log(json))
                //       .catch(err => console.error('error:' + err));
                // console.log(result);
                
                res.status(200).json({
                    newBooking  :result
                    
                })
            
               })//Saving Order Data
               .catch(err=>{
                res.status(500).json({
                    error:err
                })
            })
           }
   
   
    
})

router.post('/airporttocity',(req, res, next)=>{
     order = new Order({
        _id: new mongoose.Types.ObjectId,
        customerName: req.body.customerName,
        mobile: req.body.mobile,
        email: req.body.email,
        pickupAddress: req.body.pickupAddress,
        dropoffAddress: req.body.dropoffAddress,
        pickupDate: req.body.pickupDate,
        pickupTime: req.body.pickupTime,
        carType: req.body.carType
       })
       order.save()
       .then(result=>{
        console.log(result);
        res.status(200).json({
            newOrder:result
        })
       })//Saving Order Data
       .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
    
})

//order delete
router.delete('/:id',(req, res, next)=>{
    Order.remove({_id:req.params.id})
    .then(result=>{
        console.log(result);
        res.status(200).json({
            result:result
        })
})
.catch(err=>{
    res.status(400).json({
        error:err
    })
})


})
router.put('/:id',(req, res, next)=>{
    console.log(req.params.id);
    Order.findOneAndUpdate({_id:req.params.id },{
        $set:{
            customerName: req.body.customerName,
            mobile: req.body.mobile,
            email: req.body.email,
            pickupAddress: req.body.pickupAddress,
            dropoffAddress: req.body.dropoffAddress,
            pickupDate: req.body.pickupDate,
            pickupTime: req.body.pickupTime,
            carType: req.body.carType

        }
    }).then(result=>{
         res.status(200).json({
            updated_order:result
         })
         
    }) 
    .catch(err=>{
       res.status(400).json({
        error:err
       })
    })
})










module.exports = router;
