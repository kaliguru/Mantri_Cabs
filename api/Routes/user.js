const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../modules/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const chechAuth = require('../middleware/check-auth');

//user get
router.get('/',chechAuth,(req, res, next)=>{
    User.find()
    .then(result=>{
        res.status(200).json({
        userData:result
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})


//user getById
router.get('/:id',(req, res, next)=>{
    console.log(req.params.id);
User.findById(req.params.id)
.then(result=>{
    res.status(200).json({
        user:result
    });
})
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})


//user signup
router.post('/signup',(req, res, next)=>{

    bcrypt.hash(req.body.password,12,(err,hash)=>{
        if(err){
             
            return res.status(400).json({
                error:err 
            })
        }else
        {
            const user = new User({
                _id:new mongoose.Types.ObjectId,
                email: req.body.email,
                password: hash,
                userType:req.body.userType
               })
               user.save()
               .then(result=>{
                console.log(result);
                res.status(200).json({
                    newUser:result
                })
               })
               .catch(err=>{
                res.status(500).json({
                    error:err
                })
            })

        }
    })

})

//user delete

router.delete('/:id',(req, res, next)=>{
    User.remove({_id:req.params.id})
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

//put request

router.put('/:id',(req, res, next)=>{
    console.log(req.params.id);
    User.findOneAndUpdate({_id:req.params.id },{
        $set:{
            email: req.body.email,
            password: req.body.password,
            userType:req.body.userType

        }
    }).then(result=>{
         res.status(200).json({
            updated_user:result
         })
    }) 
    .catch(err=>{
       res.status(400).json({
        error:err
       })
    })
})

//login login
 router.post('/login',(req, res, next)=>{
    console.log('request recieved')
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        console.log('user data',user)
        if(user.length === 0 ){

            return res.status(404).json({
                msg:'User Not Found'
            })
        }else{   
            bcrypt.compare(req.body.password, user[0].password,(err, result)=>{

                if(!result)
                {
                    return res.status(400).json({
                        msg:"Password didn't match"
                    })
                }
                if(result)
                {
                    const token = jwt.sign({
                           user:user[0].email,
                           userType:user[0].userType,
                    },
                    'This is the key',
                    {
                        expiresIn:"24h"
                    }
                    );
                    res.status(200).json({
                        email:user[0].email,
                        userType:user[0].userType,
                        token: token
                    })
                }
                

            })

        
        } 
    }).catch(err=>
        {
            res.status(500).json({
                error:err
            })
        })
 })





module.exports = router;



/*
router.post('/login',(req, res, next)=>{
    User.find({phone: req.body.phone})
    .exec()
    .then(user=>{
        if(user.length < 1){
            return res.status(404).json({
                msg:'User Not Found'

            })

        }
    },
    bcrypt.compare(req.body.password, user[0].password,(err, result)=>{
        if(!result){
            res.status(400).json({
                msg:'Phone or Password Incorrect'
            })
        }
        if(result){
            const token = jwt.sign({
                phone:user[0].phone,
                 userType:user[0].userType
            },
             'This is Your Token',
             {
                expiresIn:"24h"
             }
            
            );
            res.status(200).json({
                phone:user[0].phone,
                userType:user[0].userType,
                token: token
            })
        }
    } )
    ).catch(err=>{
        res.status(400).json({
            error:err
        })
    })
    

})
*/



/*
router.post('/login',(req, res, next)=>{
    User.find({phone:req.body.phone})
    .exec()
    .then(user=>{
        if(user.length<1){
            return res.status(404).json({
                msg:'User Not Found'

            })
        }
        bcrypt.compare(req.body.password, user[0].phone, (err, result)=>{

            if(!result)
            {
                res.status(400).json({
                    msg:'Phone or Password Incorrect'
                })
            }
            if(result)
            {
                const token = jwt.sign({
                    phone:user[0].phone,
                //  userType:user[0].userType,
                 token: token
                },
                'this is your token',
                {
                    expiresIn:"24h"
                }
                );
                res.status(200).json({
                    phone:user[0].phone,
                    userType:user[0].userType,
                    token: token
                })
            }
           }
        )
    }
    ).catch(err=>{
       res.status(400).json({
        error:err
       })
    })
 })
 */