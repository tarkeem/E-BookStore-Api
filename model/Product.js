const mongoose = require('mongoose') ;
const bcrypt = require('bcrypt') ;

const productSchema = mongoose.Schema({
    name : {
        type : String ,
        required : true

    } ,
    description : {
        type : String ,
        required : true

    } ,
    imageurl : {
        type : String ,
        required : true

    },
    userid : {
        type : mongoose.Schema.Types.ObjectId ,
        required : true,
        ref:'User'

    },
    price : {
        type : Number ,
        required : true

    },
    quantity : {
        type : Number ,
        required : true

    },
    commentsid :[{
        type : mongoose.Schema.Types.ObjectId ,
        default:[],
        ref:'Comment'
    }] 

})
module.exports = mongoose.model('Product' , productSchema) ;