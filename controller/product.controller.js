const productDp=require('../model/Product')
var logger=require('../utilits/loggerHelper')

var log=new logger('proguct.logger')





exports.uploadProduct=async(req,res,next)=>{

    var name=req.body.name
    var userid=req.body.uid
    var quantity=req.body.quantity
    var price=req.body.price
    var imageurl=req.file.path
    var description=req.body.description

    console.log(req.file)

productDp.create({
    name:name,
    description:description,
    userid:userid,
    quantity:quantity,
    price:price,
    imageurl:imageurl
}).then((result) => {
    log.info('new book uploaded')
    res.status(200).json({"msg":"product has been upladed"})
}).catch((err) => {
    console.log(err)
    res.status(404).json({"error":"cant upload the photo"})
})
}

exports.updateProduct=async(req,res,next)=>{

    var id=req.params.id
    var name=req.body.name
    var quantity=req.body.quantity
    var price=req.body.price
   var prod= await productDp.findOneAndUpdate({ 
        _id: id
    }, {
        name:name,
        quantity:quantity,
        price:price,
    },
   );


   if(!prod)
   {
       res.status(400).json({"msg":"not updated"})
   }
   else
   {
       res.status(200).json({"msg":"updated","docs":prod})
   }
   
}   



exports.getProductById=async(req,res,next)=>{

    var id=req.params.id
    var prod=await productDp.findById(id).populate('userid');
    

    if(prod)
    {
        res.status(200).json({
        'product':prod
    })
    }
    else
    {
        res.status(404).json({
            'msg':'not found '
        })
    }
 }








 exports.findAll=async(req,res,next)=>{

    var prod=await productDp.find({}).populate('userid');
    

    if(prod)
    {
        res.status(200).json({
        'products':prod
    })
    }
    else
    {
        res.status(404).json({
            'msg':'not found '
        })
    }
 }






 exports.search=async(req,res,next)=>{

    var name=req.query.name
    var price=req.query.price
    var prods=await productDp.find().and([{ "name": { "$regex": name, "$options": "i" }},{"price":{"$lt":price}}])
    

    if(prods)
    {
        res.status(200).json({
        'product':prods
    })
    }
    else
    {
        res.status(404).json({
            'msg':'not found '
        })
    }
 }




 exports.getProductsPagination=async(req,res,next)=>{

    
    const limitValue = req.query.limit || 2; 
    const skipValue = req.query.skip || 0; 
    const products = await productDp.find() 
        .limit(limitValue).skip(skipValue); 
    res.status(200).send(products); 



 }


 exports.deleteProduct=async(req,res,next)=>{

    
   var id=req.body.id
   var prod=await productDp.deleteOne({ 
       _id: id 
   },);

   if(prod)
   {
    res.status(200).json({'msg':prod})
   }
   else
   {
    res.status(400).json({'msg':prod})
   }

 }





 exports.addComment=async(req,res,next)=>{

    
    var id=req.body.id
    
 
  }






exports.getProduct=async(prodId)=>{

   var prod=await productDp.findById(prodId);
   return prod
}