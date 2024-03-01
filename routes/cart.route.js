var express=require('express')
var router=express.Router()
var ctr=require('../controller/cart.controller')



router.post('/add',ctr.addCart)
router.get('/get',ctr.getCarts)
module.exports = router;