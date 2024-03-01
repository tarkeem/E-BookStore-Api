const cartDb=require('../model/cart')
const prodCtr=require('./product.controller')

exports.addCart=async (req,res)=>{
   var uid=req.body.uid
   var products=req.body.products
   var total=0
   var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy= today.getFullYear();

      date = mm + '/' + dd + '/' + yyyy;
 var promise=[]
   products.forEach((element) => {
         promise.push(prodCtr.getProduct(element).then(val=>{total += val.price}))
         
       
   });
   await Promise.all(promise)
   console.log(total)
   

   var cart=cartDb({
    user : uid,
    product :products,
    total :total,
    date :date
   })

   cart.save().then((result) => {
    res.status(200).json({})
   }).catch((err) => {
    console.log(err)
    res.status(400).json({})
   });
    }

exports.getCarts=async(req,res,next)=>{
      try {
          var carts=await cartDb.find({ 
      }).populate('user').populate('product');
      } catch (error) {
         console.log(error)
      }
     
      res.json({
         "msg":carts
      })
    }

