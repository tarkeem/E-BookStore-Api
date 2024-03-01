const express=require('express')
const router=express.Router()
const ctr=require('../controller/product.controller')
const upload=require('../utilits/multerHelper').upload
const verifyToken=require('../utilits/tokenHelper').verifyToken




router.post('/upload',verifyToken,upload.single('pic'),ctr.uploadProduct)
router.get('/find/:id',ctr.getProductById)
router.get('/findall',ctr.findAll)
router.get('/findPagination',ctr.getProductsPagination)
router.put('/update/:id',verifyToken,ctr.updateProduct)
router.delete('/delete',verifyToken,ctr.deleteProduct)
router.get('/search',ctr.search)

module.exports=router