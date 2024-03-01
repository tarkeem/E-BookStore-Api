var express=require('express')
var router=express.Router()
var ctr=require('../controller/comment.controller')



router.post('/addcomment',ctr.addComment)
module.exports = router;