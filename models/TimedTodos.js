const { Mongoose } = require("mongoose");
const Taskschema = new mongoose.Schema({
    title : {
        type : String ,
        required : true
    },
    tagId : {
        type : String ,
        required : true
    },
    date : {
        type : String ,
        required : false
    }
})


const User = mongoose.model('User' , UserSchema)

module.exports = User