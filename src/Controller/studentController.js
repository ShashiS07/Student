const studentModel=require('../Model/studentModel')
const mongoose=require('mongoose');
const teacherModel = require('../Model/teacherModel');
const IsValid=mongoose.Types.ObjectId.isValid


// ==================create Student========================================

const createStudent=async function(req,res){
try{
    let teacherId=req.params.teacherId;
    if(!IsValid(teacherId))return res.status(400).send({status:false,message:"teacherId is not valid"})
    let checkteacher=await teacherModel.findById({_id:teacherId})
    if(!checkteacher) return res.status(404).send({status:false,message:"Teacher not found"})

    let data=req.body
    let {name,subject,marks,...rest}=data
    data.teacherId=teacherId
    if(!Object.keys(data).length) return res.status(400).send({status:false,message:"All fields are mandetory"})
    if(Object.keys(rest).length>0) return res.status(400).send({status:false,message:"Please provide name,subject and marks"})

    if(!name) return res.status(400).send({status:false,message:"Please provide name"})
    if(name){
        let checkname=await studentModel.find({name})
        if(checkname.length>0) return res.status(400).send({status:false,message:"This name is already taken"})
    }
    if(!subject) return res.status(400).send({status:false,message:"Please provide subject"})
    if(!marks) return res.status(400).send({status:false,message:"Please provide marks"})

    let studentDetail=await studentModel.create(data)
    return res.status(201).send({status:true,messgae:"success",data:studentDetail})

}catch(error){
    return res.status(500).send({status:false,message:error.message})
}
}

// ============================get student===================================

const getStudent=async function(req,res){
try{
    let data=req.query
    let filterStudent={isDeleted:false}
    if(!Object.keys(data).length){
        let studentList=await studentModel.find(filterStudent).select({name:1,subject:1,marks:1,_id:0})
        return res.status(200).send({status:true,message:"Student List",data:studentList})
    }else{
        let {name,subject,...rest}=data
        if(Object.keys(rest).length>0) return res.status(400).send({status:false,message:"Please Provide valid query"})
        if(name){
            filterStudent.name=name
        }
        if(subject){
            filterStudent.subject=subject
        }
        let studentList=await studentModel.find(filterStudent).select({name:1,subject:1,marks:1,_id:0})
        if(studentList.length==0) return res.status(404).send({status:false,message:"No Student found"})
        return res.status(200).send({status:true,message:"Student List",data:studentList})
    }

}catch(error){
    return res.status(500).send({status:false,messgae:error.message})
}
}

// =================================update student marks=====================================

const updateMarks=async function(req,res){
try{
    let data=req.body
    if(!Object.keys(data).length) return res.status(400).send({status:false,message:"Please provide some data"})

    let {name,subject,marks,...rest}=data
    if(Object.keys(rest).length>0) return rest.status(400).send({status:false,message:"Please Provide Only name,subject and marks"})

    let checkStudentExist=await studentModel.findOne({name,subject}).select({name:1,subject:1,marks:1,_id:0})
    if(!checkStudentExist){
        let newStudent=await studentModel.create(data)
        return res.status(201).send({status:true,message:"Success",data:newStudent})
    }else{
        let updatemarks=checkStudentExist.marks+marks
        let updateStudent=await studentModel.findOneAndUpdate({name},{marks:updatemarks},{new:true})
        return res.status(200).send({status:true,message:"Marks added",data:updateStudent})
    }

}catch(error){
    return res.status(500).send({status:false,message:error.message})
}    
}

// ========================delete student data==============================================

const deleteStudent=async function(req,res){
try{
    let studentId=req.params.studentId
    if(!IsValid(studentId)) return res.status(400).send({status:false,message:"studentID is invalid"})

    let details=await studentModel.findOneAndUpdate({_id:studentId,isDeleted:false},{isDeleted:true},{new:true})
    if(!details) return res.status(404).send({status:false,message:"No data found"})

    return res.status(200).send({status:false,message:"Student Data deleted Successfully"})

}catch(error){
    return res.status(500).send({status:false,message:error.messgae})
}
}

module.exports={createStudent,getStudent,updateMarks,deleteStudent}