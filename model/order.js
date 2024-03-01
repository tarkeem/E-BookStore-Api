const mongoose = require('mongoose') ;
const bcrypt = require('bcrypt') ;


const productSchema = mongoose.Schema({
    carts : {
        type : [String] ,
        required : true

    } ,
    total : {
        type : Number ,
        required : true

    } ,
    country : {
        type : String ,
        required : true

    } ,
    address : {
        type : String ,
        required : true

    } ,
    payment : {
        type : String ,
        required : true,

    } ,
    

})
module.exports = mongoose.model('Product' , productSchema) ;