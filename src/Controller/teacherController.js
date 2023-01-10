const teacherModel=require('../Model/teacherModel')
const jwt=require('jsonwebtoken')

const createTeacher=async function(req,res){
try{
    let data=req.body
    let {name,email,password, ...rest}=data

    if(!Object.keys(data).length) return res.status(400).send({status:false,message:"All fields are mandatory"})
    if(Object.keys(rest).length>0) return res.status(400).send({status:false,message:"Please provide only name,email and password"})

    if(!name) return res.status(400).send({status:false,message:"Please provide Name"})
    if(!email) return res.status(400).send({status:false,message:"Please provide Email"})
    if(!password) return res.status(400).send({status:false,message:"Please provide Password"})

    if(email){
        let checkemail=await teacherModel.find({email})
        if(checkemail.length>0) return res.status(400).send({status:false,message:"This email is already taken"})
    }
    let teacher=await teacherModel.create(data)
    return res.status(201).send({status:true,message:"success",data:teacher})
}catch(error){
    return res.status(500).send({status:false,message:error.message})
}
}

// =============================login==================================================

const login=async function(req,res){
try{
    let data=req.body
    let {email,password, ...rest}=data

    if(!Object.keys(data).length) return res.status(400).send({status:false,message:"Please provide email and password"})
    if(Object.keys(rest).length>0) return res.status(400).send({status:false,message:"Please provide only email and password"})

    if(!email) return res.status(400).send({status:false,message:"Please provide email"}) 
    if(!password) return res.status(400).send({status:false,message:"Please provide password"}) 

    let teacherlogin=await teacherModel.findOne({email,password})
    if(!teacherlogin) return res.status(404).send({status:false,message:"email or password is invalid"})

    let token= jwt.sign({teacherId:teacherlogin._id},"studentkey", {expiresIn:"1d"})
    return res.status(200).send({status:true,message:"Login Successful",token:token})

}catch(error){
    return res.status(500).send({status:false,message:error.message})
}
}

module.exports={createTeacher,login}