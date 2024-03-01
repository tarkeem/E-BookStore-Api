const mongoose = require('mongoose') ;

const commentSchema = mongoose.Schema({
    userid : {
        type : mongoose.Schema.Types.ObjectId ,
        required : true,
        ref:"User"

    } ,
    content :{
        type :  String ,
        required : true,
    } 


    

})
module.exports = mongoose.model('Comment' , commentSchema) ;