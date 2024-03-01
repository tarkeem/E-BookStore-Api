const productDp=require('../model/Product')
const commentDp=require('../model/comment')
var logger=require('../utilits/loggerHelper')
var log=new logger('comment')
exports.addComment=async(req,res,next)=>{

    
   var uid=req.body.uid
   var content=req.body.content
   var prodid=req.body.productid
   var comment=await commentDp.create({userid:uid,content:content})
   
   
   var r=await productDp.updateOne(
      { _id: prodid },
      { $push: { commentsid: comment._id } }
      );
      log.info('comment operating',{"user":uid,"content":content})
   res.json({"msg":r})
    
 
  }