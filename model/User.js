const mongoose = require('mongoose') ;
const bcrypt = require('bcrypt') ;

const userSchema = mongoose.Schema({
    email : {
        type : String ,
        required : true

    } ,
    name : {
        type : String ,
        required : true

    } ,
    password : {
        type : String ,
        required : true

    } ,
})
module.exports = mongoose.model('User' , userSchema) ;