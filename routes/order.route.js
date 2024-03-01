var express=require('express')
var router=express.Router()
var ctr=require('../controller/order.controller')
const verifyToken=require('../utilits/tokenHelper').verifyToken


router.post('/addorder',verifyToken,ctr.addOrder)
router.post('/getorder',verifyToken,ctr.getCarts)
module.exports = router;