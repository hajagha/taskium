const router = require('express').Router()

const User = require('../models/Users')

const jwt = require('jsonwebtoken')
const e = require('express')

router.post('/getalltasks' ,async (req , res) => {
   const token  = req.body.token
   let email  = req.body.email
   email = email.toLowerCase()
   

   console.log('credintial' ,token , email)
  




   await User.findOne({email : email}).then(user => {
       if(!user)
       {
           res.send('no user found')
       }
       if(user)
       {
        

            console.log(user)
            jwt.verify(token , 'SecretKey' , (err , Email) => {
                if(err)
                {
                    console.log(err)
                }else {
                    if(Email.email == email)
                    {
                        const timedtodos = user.timedtodos
                        
                        const floating = user.floating
                        res.send({
                            'timedtodos' : timedtodos ,
                            'floating' : floating
                        })
                    }else {
                        res.send({
                            "message" : 'token is fucked'
                        })
                    }
                }
            })
       }
   })

})

router.post('/addTimeTodos' , async (req , res) => {
    const token  = req.body.token
    let email  = req.body.email
    const todos = req.body.todos
    email = email.toLowerCase();

    console.log(todos)
    

    await User.findOne({email : email}).then(user => {
        if(!user)
        {
            res.send('no user found')
        }
        if(user)
        {
              jwt.verify(token , 'SecretKey' , (err , Email) => {
                 if(err)
                 {
                     console.log(err)
                 }else {
                     if(Email.email == email)
                     {
                         console.log('added')
                          User.findOneAndUpdate({email : email} , {timedtodos : todos} , {new : true}).then(user => console.log(user))
                         res.send({
                             "message" : "done"
                         })
                     }
                     else {
                        res.send({
                            "message" : 'token is fucked'
                        })
                     }
                 }
             })
        }
    })
 

})


router.post('/addFloating' , async (req , res) => {
    const token  = req.body.token
    let email  = req.body.email
    let floating = req.body.floating
    email = email.toLowerCase();
    console.log('input' , floating)

    await User.findOne({email : email}).then(user => {
        if(!user)
        {
            res.send('no user found')
        }
        if(user)
        {
             jwt.verify(token , 'SecretKey' , (err , Email) => {
                 if(err)
                 {
                     console.log(err)
                 }else {
                     if(Email.email == email)
                     {
                         User.findOneAndUpdate({email : email} , {floating : floating} , {new : true}).then(user => console.log(user))
                         res.send({
                             "message" : "done"
                         })
                     }
                     else {
                         console.log(Email.email , email)
                        res.send({
                            "message" : 'token is fucked'
                        })
                     }
                 }
             })
        }
    })
 

})



router.delete('/deleteFloating', async(req , res)=> {
    const token = req.body.token 
    let email = req.body.email
    email = email.toLowerCase()
    let id = req.body.id

    console.log(id)

    await User.findOne({email : email}).then(user => {
        if(!user)
        {
            res.send({"message" : 'no user found'})
        }else {
            jwt.verify(token , "SecretKey" , (err , Email) => {
                if(err) 
                {
                    console.log(err)
                }else{
                    if(Email.email == email)
                    {
                        User.findOneAndUpdate({email : email})
                        res.send({"message" : 'done'})
                    }else {
                        console.log(Email.email , email)
                       res.send({
                           "message" : 'token is fucked'
                       })
                    }
                }
            })
        }
    })

})

module.exports = router