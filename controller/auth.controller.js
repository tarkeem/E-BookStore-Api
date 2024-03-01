const userDb=require('../model/User')
var bcrypt = require('bcryptjs');
const util = require('../utilits/tokenHelper') ;
const logger=require('../utilits/loggerHelper')
const validation=require('../utilits/validationHelper')

var log=new logger('auth')

exports.signin=async (req,res)=>{

    log.info('signin operating..... ')
    var pemail=req.body.email
    var pass=req.body.passowrd
    console.log(pemail)
     var dataRes=await userDb.find({
        email: pemail,
    })

   if(dataRes.length==0)
   {
    res.status(404).json({
        "msg":"email not found"
    })
    return
   }
  
        var user=dataRes[0]
        console.log(user.password)
        console.log(pass)
       c=validation.comparePassword(pass,user.password)
            if(c)
        {
            res.status(200).json({
                "msg":"good"
            })
        }
        else
        {
            res.status(404).json({
                "msg":"wrong password"
            })
        }
        
    }

exports.signup=async (req,res)=>{
var email=req.body.email
var name=req.body.name
var pass=req.body.passowrd
console.log(email)
console.log(pass)
if(!validation.isValidEmail(email))
{
   return res.status(400).json({
    "msg":"not validated email"
   })
}

if(!validation.isValidPassword(pass))
{
   return res.status(400).json({
    "msg":"not validated password"
   })
}
 log.info('signup operating.....',{"email":email,'name':name})
 pass=await bcrypt.hash(pass,8)
    var user=new userDb({
        email:email,
        name:name,
        password:pass
    })

    user.save().then((result) => {
        var token=util.generateToken(name,email)
        res.json({
            "token":token
        })
    }).catch((err) => {
        console.log(err)
        res.json({
            "msg":"not pass"
        })
    });
}