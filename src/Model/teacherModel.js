const mongoose=require('mongoose')

const teacherSchema=new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String}
},{timestamps:true})

module.exports=mongoose.model('Teacher',teacherSchema)