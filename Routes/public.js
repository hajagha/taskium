const { Router } = require('express')

const jwt = require('jsonwebtoken')

const express = require('express')

const User = require('../models/Users')

const bcrypt = require('bcryptjs')
const e = require('express')

const router = express.Router()

router.get('/' , (req , res) => {
    console.log('requested')
    res.send({'message' : 'ok'})
})


router.post('/Register' , (req , res) => {
    
    let email = req.body.email
    const name = req.body.name
    const pass = req.body.password
    email = email.toLowerCase();
    console.log(name , pass , email)
    let errors = []

    
    User.findOne({email : email}).then(user => {
        if(user) {
            res.send({
                'message' : 'User already existed'
            })
        }else {
            const newUser = new User({
                name : name,
                email : email ,
                password : pass
            })
            bcrypt.genSalt(10 , (err , salt) =>
            bcrypt.hash(newUser.password , salt , (err ,hash)=> {
              if(err) 
              {
                  console.log(err.message)
              }
              //set password to hashed one
              newUser.password = hash
              // Save user
              newUser.save().then(user => {
                res.status(200)
                 res.send({
                     'message' : 'Registeration successfull' ,
                      'user' : user
                 })
              }).catch(err => console.log(err))

          }))


        }
    })



})

router.post('/Login' , async (req , res) => {
    let email = req.body.email
    const password = req.body.password

   email = email.toLowerCase();
    


const user = await User.find({email : email})



await User.findOne({email : email}).then(user => {

        if(!user) 
        {
           
                res.send({
                    'message' : 'user not found'
                })
        }
        if(user)
        {
           
            
            bcrypt.compare(password , user.password , (err , isMatch) => {
                if(err) 
                {
                    
                    console.log(err.message)
                }
                if(isMatch) {
                    const token = jwt.sign({email : user.email} , 'SecretKey')
                    res.send({
                        'message' : 'login SuccessFull' ,
                        'token' : token ,
                         'name' : user.name
                    })
                }
            })
        }
         
    

        })
})


module.exports = router