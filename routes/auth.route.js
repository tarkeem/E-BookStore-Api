var express=require('express')
var router=express.Router()
var ctr=require('../controller/auth.controller')



router.post('/signin',ctr.signin)
router.post('/signup',ctr.signup)
module.exports = router;