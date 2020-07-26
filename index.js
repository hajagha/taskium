const express = require('express')

const app = express()



const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 5000

const db = "mongodb+srv://hajagha:9090Kosenanat@cluster0.vgsks.mongodb.net/todo?retryWrites=true&w=majority"


mongoose.connect(db , {useNewUrlParser : true}).then(() =>{console.log('connected to database')}).catch((err) => console.log('Cant Connect to mongo cluster'))




app.use(bodyParser())

app.use(express.urlencoded({extended : false}))

app.use('/' , require('./Routes/public'))
app.use('/private', require('./Routes/private'))

app.listen(PORT , () => {console.log(`server started on port : ${PORT}`)})