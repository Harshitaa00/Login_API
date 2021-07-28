const express = require('express');
const  Mongoose  = require('mongoose');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/',(req,res)=>{
    res.status(200).json({
    message:'user route working'
 })
})

router.post('/user', (req,res)=>{
    console.log(req.body.username);

 var newpassword= bcrypt.hash(req.body.password,10,(err,hash)=>{
      if(err)
      {
          return res.status(500).json({
              error:err
          })
      }
      else{
          console.log(hash);
          const user = new User({
              username:req.body.username,
              password:hash,
              email:req.body.email,
              phone:req.body.phone,
              gender:req.body.gender
          })
           user.save()
          .then(result=>{
              res.status(200).json({
                  new_user:result,
                  msg:'you are successfully registered'
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
router.post('/login', (req,res)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length < 1)
        {
            return res.status(401).json({
                msg:'user not exist'
            })
        }
        console.log(user[0].password);
        console.log(req.body.password);
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(!result)
            {
                return res.status(401).json({
                    msg:'password matching fail'
                })
            }
            if(result)
            {
                const token = jwt.sign({
                    username:user[0].username,
                    email:user[0].email,
                    phone:user[0].phone
                },
                'this is dummy text',
                
               {
                 expiresIn:"24h"
               }
               );
               res.status(200).json({

               // 'hi'  : user[0].username ,
                    
                username:user[0].username,  
                email:user[0].email,
                phone:user[0].phone,
                token:token 
              
               })
              
            }
            
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

module.exports = router; 


