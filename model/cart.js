const mongoose = require('mongoose') ;
const bcrypt = require('bcrypt') ;

const cartSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId ,
        required : true,
        ref:"User"

    } ,
    product :[ {
        type :  mongoose.Schema.Types.ObjectId ,
        required : true,
        ref:'Product'
    } ],
    total : {
        type : Number ,
        required : true

    } ,
    date : {
        type : String ,
        required : true

    } ,


    

})
module.exports = mongoose.model('Cart' , cartSchema) ;