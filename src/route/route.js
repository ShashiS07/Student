const express=require('express')
const router=express.Router()
const {createTeacher,login}=require('../Controller/teacherController')
const {createStudent,getStudent}=require('../Controller/studentController')
const {authentication}=require('../Auth/auth')

router.post('/createteacher',createTeacher)
router.post('/login',login)

router.post('/createstudent/:teacherId',authentication,createStudent)
router.get('/getstudent',getStudent)

router.all('/*',function(req,res){
    return res.status(404).send({messgae:"Invalid http request"})
})

module.exports=router