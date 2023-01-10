const express=require('express')
const router=express.Router()



router.all('/*',function(req,res){
    return res.status(404).send({messgae:"Invalid http request"})
})

module.exports=router